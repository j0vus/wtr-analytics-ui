import { Component, OnInit, ElementRef, ViewChild, Renderer2, ChangeDetectorRef, Injectable } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedDataService } from 'app/core/services/shared/shared-data.service';
import { event } from 'jquery';
import { filter } from 'rxjs/operators';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  MatDateSelectionModel,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Moment } from 'moment';
import { MatInput } from '@angular/material/input';
import { AdminLayoutRoutes } from 'app/layouts/admin-layout/admin-layout.routing';
import { AppConsts } from 'app/core/constants/appConstants';
import { ApiService } from 'app/core/services/api/api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], 
})


export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    searchTerm: string = '';
    data: any[] = []; 
    filteredData: any[] = [];
    showDropdown: boolean = false;
    showSearhBox:boolean = false;
  
    @ViewChild('dateRangeInput') dateRangeInput: any;
    @ViewChild('startDateInput') startDateInput: any;
    @ViewChild('endDateInput') endDateInput: any;
    @ViewChild('searchItems') searchItems: any;
    @ViewChild(MatDateRangePicker)
    picker: MatDateRangePicker<Moment>;

    constructor(location: Location,  private element: ElementRef, private router: Router, private shareData: SharedDataService, private renderer: Renderer2, private chRef: ChangeDetectorRef, private fb:FormBuilder, private apiService:ApiService) {
      this.location = location;
          this.sidebarVisible = false;
          
          console.log('djj' + this.showSearhBox);

          this.shareData.sharedSearchItems$.subscribe((data) => {
            this.data.length =0;
            if(data != null){
              if(data[0]==='industry') {
                data.forEach((item, index)=>{
                  if(index > 0) {
                    this.data.push(item.industryName);
                  }
                })
              } 
              if(data[0]=== 'issuer'){
                data.forEach((item, index)=>{
                  if(index > 0){
                    this.data.push(item.issuerName);
                  }
                })
              }
              console.log(data);
            }
          });   
          
          // this.shareData.searchBoxShow$.subscribe((data)=>{
           
          //   if(data != null ){
          //     console.log(data);
          //     // this.showSearhBox=data;
          //     console.log(this.showSearhBox);
          //     if(this.showSearhBox){
          //       this.showDropdown=true;
          //     } else {
          //       this.showDropdown = false;
          //     }
          // }
          // });
            // console.log(this.getTitle());
    }

    
    resetPicker() {
        this.picker.select(undefined);
        this.startDateInput.select(undefined);
        this.endDateInput.select(undefined);
      }   
  

    ngOnInit(){
      // console.log(this.getTitle());
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      console.log(this.listTitles);
      // this.listTitles = AdminLayoutRoutes.filter(listTitle=>listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });

     //reset the date range  and search bar
     this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        const newUrl = event.url;
        console.log('URL changed to:', newUrl);
        this.data.length=0;
        this.filteredData.length=0;
        if(this.searchItems){
            this.searchItems.nativeElement.value = '';
            this.showDropdown = false;
        }

        console.log();
        if(this.getTitle()=== 'Sectors' || this.getTitle()=== 'Companies'){
          this.showSearhBox=true;
        } else {
          this.showSearhBox=false;
        }

        this.showDropdown = false;    

        this.resetPicker();        

      });
    
     
    }
      

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          // titlee = titlee.slice( 1 );
          let parts = titlee.split('/');
           titlee = '/' + parts[1];
           console.log(titlee);

      }
    
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      
      return 'Dashboard';
    }

    
    selectedDateRange(){
        const startDate = this.convertDateFormat(this.startDateInput.nativeElement.value);
        const endDate = this.convertDateFormat(this.endDateInput.nativeElement.value);
        const pages = ['Sectos','Companies'];
        if(pages.includes(this.getTitle())) {
            const search = this.searchItems.nativeElement.value;
            this.shareData.updateSharedData(this.getTitle() +":"+ startDate +":" + endDate + ":" + search);
        } else {
            this.shareData.updateSharedData(this.getTitle() +":"+ startDate +":" + endDate);
        }
        
 }


 convertDateFormat(inputDate: string): string {
    const parts = inputDate.split('/');
  
    if (parts.length === 3) {
      const month = parseInt(parts[0]);
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);

      const date = new Date(year, month - 1, day); 

      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      }
    }

    return '';
  }

  onSearch() {
    if (this.searchTerm.length > 0) {
      this.filteredData = this.data.filter(item => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.showDropdown = true;
      console.log(this.filteredData);
    } else {
      this.showDropdown = false;
    }
  }

  selectItem(item: string) {
    this.searchTerm = item;
    this.showDropdown = false;
  }

}



