import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { FacturaService } from '../../services/factura.service';
import { CargarFacturas } from '../../interfaces/cargar-detalles-facturas';
import { Factura } from '../../models/factura.model';
import { DetalleFacturaService } from '../../services/detalle-factura.service';
import { DetalleFactura } from '../../interfaces/factura.forms';


@Component({
  selector: 'app-lines-graph',
  templateUrl: './lines-graph.component.html'
})
export class LinesGraphComponent implements OnInit {

  public facturas: Factura[] = [];
  public detalleFacturas: DetalleFactura;

  public lineChartData: Array<any> = [
  ]

  public lineChartLabels: Array<any> = [];

  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    // let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    // for( let i = 0; i<this.lineChartData.length; i++ ) {
    //   _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    //   for( let j = 0; j<this.lineChartData[i].data.length; j++ ) {
    //     _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    //   }
    // }
    // this.lineChartData = _lineChartData;
  }

  // Events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor( private facturasService: FacturaService, private detalleFacturaService: DetalleFacturaService ) { }

  ngOnInit(): void {
    this.cargaDetallesFacturas();
  }

  cargaDetallesFacturas() {
      this.detalleFacturaService.cargarDetallesFacturas(0)
        .subscribe( resp => {
          resp.detallesFacturas.forEach( detFact => {
            
            this.lineChartData.push({data: detFact.cantidad, label: detFact.precio_unitario});
          });
          
        })

    this.facturasService.getFacturas()
      .subscribe( (resp: CargarFacturas) => {
        resp.facturas.forEach(facts => {
          this.lineChartLabels.push(facts.fecha);
          // this.lineChartData.push({data: facts.total_factura, label: facts.usuario})
        });
        
      })
  }

}
