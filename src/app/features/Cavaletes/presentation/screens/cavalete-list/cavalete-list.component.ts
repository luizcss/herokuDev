import { Cavalete } from './../../../data/models/cavalete';
import { ICavaleteEntity } from './../../../domain/entities/cavalete.entity';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CavaleteFormComponent } from '../cavalete-form/cavalete-form.component';
import { CavaleteService } from '../../../cavalete.service';

@Component({
  selector: 'custom-cavalete-listagem',
  templateUrl: './cavalete-list.component.html',
  styleUrls: ['./cavalete-list.component.scss']
})
export class CavaleteListComponent implements OnInit {

  cavaletes: ICavaleteEntity[];
  selectedCavalete: ICavaleteEntity;


  displayedColumns: string[] = ['id', 'tipocavalete', 'datacadastro', 'dataatualizacao', 'acoes'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;


  constructor(
    private service: CavaleteService,
    public matDialog: MatDialog,
  ) { }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "300px";
    dialogConfig.panelClass = "form-cavalete-class"
    dialogConfig.data = this.selectedCavalete === undefined ? new Cavalete('') : this.selectedCavalete;
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CavaleteFormComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(data => {
      console.log(`Dialog sent:`, data);
      if (data !== undefined) {
        this.salvaCavalete(data);
      }
      this.selectedCavalete = undefined;
    });
  }

  ngOnInit() {

    this.service.getCavaletes().subscribe(result => {
      console.log(result);
      this.cavaletes = result.cavaletes;
    });

    this.dataSource = new MatTableDataSource<ICavaleteEntity>(this.cavaletes);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  carregaCavaletes() {
    this.service.getCavaletes().subscribe(result => {
      console.log(result);
      this.cavaletes = result.cavaletes;
    });
  }

  salvaCavalete(cavalete: ICavaleteEntity) {
    const data: ICavaleteEntity[] = [...this.dataSource.data];
    let novoID = data.length;
    if (cavalete.id === 0) {
      cavalete.id = ++novoID;
      cavalete.dataatualizacao = new Date();
      cavalete.datacadastro = new Date();
      data.push(cavalete);

    } else {
      for (let i = 0; i < data.length; i++) {
        if (cavalete.id === data[i].id) {
          data[i].tipocavalete = cavalete.tipocavalete;
          data[i].dataatualizacao = new Date();
        }
      }
    }

    this.dataSource = new MatTableDataSource<ICavaleteEntity>(data);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.carregaCavaletes();

  }

  selecionaCavalete(cavalete: ICavaleteEntity): void {
    this.selectedCavalete = cavalete;
    this.openModal();
  }

  excluiCavalete(cavalete: ICavaleteEntity) {
    this.dataSource = new MatTableDataSource<ICavaleteEntity>(
      this.cavaletes.filter(function (el) {
        return el.id !== cavalete.id;
      })
    );

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.carregaCavaletes();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public doFilter = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    this.dataSource.filter = target!.value.trim().toLocaleLowerCase();
  }

}
