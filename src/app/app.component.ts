import {Component, ElementRef, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { ECharts, EChartsOption, EChartsType} from "echarts/types/dist/echarts";
import {CommunicationService, ComtradeInfo, Current, FaultCurrentInfo} from "./communication.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'front';
  scopeOptions!: EChartsOption;
  options!: EChartsOption;
  datasource!: ComtradeInfo[]
  tabIndex: number = 0;
  private scopeEcharts!: EChartsType;
  private rmsEcharts!: EChartsType;
  displayedColumns: string[] = ['time', 'value'];
  clickedName = "";
  fontStyle!: string;
  DataSource = new MatTableDataSource<FaultCurrentInfo>();
  datacurrent!: Current[];
  current!: Current[];
  constructor(private service: CommunicationService,
              private el: ElementRef) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;



  ngAfterViewInit() {
    this.getTableData();
  }

  ngOnInit(): void {
    this.service.getScopes().subscribe(comtradeInJson => {
      this.datasource = comtradeInJson
    });
    this.service.getCurrent().subscribe(comtradeInJson => {
      this.datacurrent=comtradeInJson;
    });
    this.getTableData();
  }

  setCharts(row: ComtradeInfo): void {
    row.clicked = !row.clicked
    this.scopeOptions = {
      xAxis: [
        {data: this.datasource[0].times, gridIndex: 0},
        {data: this.datasource[0].times, gridIndex: 1},
      ],
      yAxis: [
        {gridIndex: 0},
        {gridIndex: 1, splitNumber: 1},
      ],
      series:
        this.datasource.filter(value => value.clicked).map(value => {
          return value.type === 'analog' ? {
              name: value.name,
              type: 'line',
              showSymbol: false,
              data: value.values.map(value => value * (10 ** (this.fontStyle.length - 1))),
              xAxisIndex: 0,
              yAxisIndex: 0,
            } :
            {
              name: value.name,
              type: 'line',
              showSymbol: false,
              data: value.values,
              xAxisIndex: 1,
              yAxisIndex: 1,
              areaStyle: {opacity: 0.1}
            }
        }),
      dataZoom: [
        {type: 'inside', xAxisIndex: [0, 1]}
      ],
      grid: [
        {top: '5%', bottom: '25%', left: '7%', right: '1%'},
        {top: '85%', bottom: '5%', left: '7%', right: '1%'},
      ],
      tooltip: {
        trigger: 'axis',
        align: 'left',
        verticalAlign: 'middle',
      },
    }
    // @ts-ignore
    this.scopeOptions.dataZoom = this.echarts.getOption().dataZoom;
    this.scopeEcharts.setOption(this.scopeOptions)
  }

  setRMS(row: ComtradeInfo): void {
    if (row.type === 'analog') {
      this.clickedName = row.name
      this.getTableData();
      row.clicked = !row.clicked
      this.options = {
        xAxis:
          {data: this.datasource[0].times},
        yAxis: {},
        series:
          this.datasource.filter(value => value.clicked).map(value => {
            return {
              name: value.name,
              type: 'line',
              showSymbol: false,
              data: value.rms.map(value => value * (10 ** (this.fontStyle.length - 1))),
            }
          }),
        tooltip: {
          trigger: 'axis',
          align: 'left',
          verticalAlign: 'middle',
        },
      }
      this.rmsEcharts.setOption(this.options)
    }
  }

  onMatTabChange(event: MatTabChangeEvent): void {
    this.tabIndex = event.index;
    this.datasource.forEach(value => {
      value.clicked = false
    })
    this.clickedName = "";
    this.fontStyle = "";

  }

  onChartScopeInit(event: ECharts): void {
    this.scopeEcharts = event
  }

  onChartRMSInit(event: ECharts): void {
    this.rmsEcharts = event;
  }

  getTableData(): void {
    if (this.clickedName == "IBURA1") {
      this.current=this.datacurrent.filter(value => value.name=="IBURA1");
      console.log(this.datacurrent)
      this.service.getFaultCurrentInfoA1().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });

        }
   else if (this.clickedName == "IBURB1") {
      this.current=this.datacurrent.filter(value => value.name=="IBURB1");
      this.service.getFaultCurrentInfoB1().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      })
       }
 else if (this.clickedName == "IBURC1") {
      this.current=this.datacurrent.filter(value => value.name=="IBURC1");
  this.service.getFaultCurrentInfoC1().subscribe(value => {
  this.DataSource = new MatTableDataSource(value);
  this.DataSource.paginator = this.paginator;
});
     }
  else  if (this.clickedName == "IBURA2") {
      this.current=this.datacurrent.filter(value => value.name=="IBURA2");
      this.service.getFaultCurrentInfoA2().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
        }
   else if (this.clickedName == "IBURB2") {
      this.current=this.datacurrent.filter(value => value.name=="IBURB2");
      this.service.getFaultCurrentInfoB2().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
        }
   else if (this.clickedName == "IBURC2") {
      this.current=this.datacurrent.filter(value => value.name=="IBURC2");
      this.service.getFaultCurrentInfoC2().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
          }
   else if (this.clickedName == "IBURA3") {
      this.current=this.datacurrent.filter(value => value.name=="IBURA3");
      this.service.getFaultCurrentInfoA3().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
         }

   else if (this.clickedName == "IBURB3") {
      this.current=this.datacurrent.filter(value => value.name=="IBURB3");
      this.service.getFaultCurrentInfoB3().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
         }
  else  if (this.clickedName == "IBURC3") {
      this.current=this.datacurrent.filter(value => value.name=="IBURC3");
      this.service.getFaultCurrentInfoC3().subscribe(value => {
        this.DataSource = new MatTableDataSource(value);
        this.DataSource.paginator = this.paginator;
      });
       }
}
}
