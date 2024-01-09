import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterrunningeventService } from '../../services/register-running-event.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent {
  // mog_data_serch: any
  mog_data_serch = [{ name: "archie" }, { name: "jake" }, { name: "richard" }];
  char_search: any
  search_where_id : any
  search_Form: FormGroup
  register_running_event_array: any
  list_show_register : any
  constructor(private register_running_event_Service: RegisterrunningeventService, private spinner: NgxSpinnerService) {
    this.search_Form = new FormGroup({
      char_search: new FormControl('')
    })
  }
  ngOnInit() {
    this.spinner.show()
    this.getallRegisterrunningevent()
  }
  getallRegisterrunningevent() {
    this.register_running_event_Service.getallRegisterrunningevent().subscribe(async (rs) => {
      if (rs?.status == true) {
        this.register_running_event_array = rs.result
        this.list_show_register = rs.result
        this.spinner.hide()
      }
      else {
        this.spinner.hide()
        await Swal.fire({
          showCloseButton: true,
          showConfirmButton: false,
          icon: "error",
          // title: rs?.status_code,
          text: rs?.message,
        });
      }
    })
  }
  searchBox(event: any) {
    // this.char_search = event.target.value
  }
  removersearchBox(){
    this.search_Form.controls['char_search'].reset()
    this.search_where_id = ""
  }
  onClickfilter(_id: any) {
    this.search_where_id = _id
    
  }
  onSearch(){
    console.log("this.search_where_id",this.search_where_id)
    if(this.search_where_id == "" || this.search_where_id == undefined){
      this.getallRegisterrunningevent()
    }
    else{
      let new_result  = this.register_running_event_array.filter((e : any)=> e.reg_event_id == this.search_where_id)
      this.list_show_register = new_result
    }
  }
  onRefresh(){
    window.location.reload()
  }
  formatNumber(x: any) {
    if (x) {
      x = x.toString()
      x = x.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return x;
    }
  }
}
