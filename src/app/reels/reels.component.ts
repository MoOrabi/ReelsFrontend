import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReelsService } from '../_services/reels.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Reel } from './Reel';

@Component({
  selector: 'app-reels',
  templateUrl: './reels.component.html',
  styleUrls: ['./reels.component.css']
})
export class ReelsComponent {
  isLoggedIn = false;
  username?: string;

  constructor(private reelsService: ReelsService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  title = 'Post_Reels';
  reels: Reel[];
  reel = new Reel();
  
  videoFile: File = null

  refreshReels() {
    this.reelsService.getReels()
      .subscribe(data => {
        console.log(data)
        this.reels=data
      })
  }

  desc: string;
  country: string;
  city: string;
  successMessage: string;
  @ViewChild('success') 
  successMessageEle: ElementRef<HTMLParagraphElement>

  PostReel(){ 
    const formData = new FormData(); 
    formData.append("file", this.videoFile, this.videoFile.name);
    this.reel.description = this.desc;
    this.reel.country = this.country;
    this.reel.city = this.city;
    console.log(this.reel)
    this.reelsService.addReel(this.reel, formData)
      .subscribe(data => {
        console.log(data)
        this.successMessageEle.nativeElement.style.display = "block";
        this.refreshReels()
      });
  }


  onChange(event) {
    this.videoFile = event.target.files[0];
  }
}
