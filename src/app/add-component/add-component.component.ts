import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss'],
})
export class AddComponentComponent implements OnInit {
  public loading: boolean = false;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  public groups:Array<MyGroup> = new Array<MyGroup>;

  constructor(private contService: ContactService,
    private router: Router) {}

  ngOnInit(): void {
    this.contService.getAllGroups().subscribe((data:any)=>{
      this.groups = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }
  public addSubmit(){
    this.contService.createContacts(this.contact).subscribe((data:MyContact)=>{
this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage= error;
      this.router.navigate(['/contacts/add']).then();

    })
  }
}
