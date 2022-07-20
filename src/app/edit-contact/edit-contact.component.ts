import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  loading: boolean = false;
  contactId: string | null = null;
  contact: MyContact = {} as MyContact;
  errorMessage: string | null = null;
  group: MyGroup[] = [] as MyGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((response) => {
      this.contactId = response.get('contactId');
    });
    console.log('contact id:', this.contactId);
    if (this.contactId) {
      this.loading = true;
      this.contService.getContacts(this.contactId).subscribe(
        (data: any) => {
          this.contact = data;
          this.loading = false;
          this.contService.getAllGroups().subscribe((data: any) => {
            this.group = data;
          });
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
    }
  }
  updateData() {
    if (this.contactId) {
      this.contService.updateContacts(this.contact, this.contactId).subscribe(
        (data: any) => {
          this.router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      );
    }
  }
}
