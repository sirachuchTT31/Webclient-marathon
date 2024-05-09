import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/index/services/local-storage.service';


@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss']
})
export class SettingProfileComponent {
  token: any
  name: any
  lastname : any
  avatar: any
  isCollapsed: boolean = true
  constructor(private localstorageService: LocalStorageService) {

  }
  ngOnInit(): void {
    this.avatar = this.localstorageService.getAvatar()
    this.name = this.localstorageService.getFirstname()?.toUpperCase()
    this.lastname = this.localstorageService.getLastname()?.toUpperCase()
  }
}
