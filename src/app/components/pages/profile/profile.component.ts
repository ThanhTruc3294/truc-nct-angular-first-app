import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import {DataService } from 'src/app/services/data.service'
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { ValidatePassword } from "../../../shared/validate/validate-password";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {
  submitted = false;

  // City names
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  constructor(
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {

  }
  @ViewChild('fileInput')
  el!: ElementRef;
  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
    file: [null],
    fullName: this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]],
      lastName: ['', [Validators.required]]
    }),
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cityName: ['', [Validators.required]]
    }),
    gender: ['male'],
    PasswordValidation: this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{
      validator: ValidatePassword.MatchPassword // your validation method
    }
    ),
    addDynamicElement: this.fb.array([])
  })

  /*########################## File Upload ########################*/

  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target!.files[0];
    if (event!.target!.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        // this.imageUrl = reader.result;
        // this.registrationForm.patchValue({
        //   file: reader.result
        // });
        // this.editFile = false;
        // this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    // this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    // this.editFile = true;
    // this.removeUpload = false;
    // this.registrationForm.patchValue({
    //   file: [null]
    // });
  }

  // Getter method to access formcontrols
  get myForm() {
    return this.registrationForm.controls;
  }

  // Choose city using select dropdown
  // changeCity(e: any) {
  //   this.registrationForm.get('address.cityName').setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.registrationForm.get('addDynamicElement') as FormArray
  }

  addSuperPowers() {
    this.addDynamicElement.push(this.fb.control(''))
  }

  // Submit Registration Form
  onSubmit(): void {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return;
    } else {
      console.log(this.registrationForm.value)
    }

  }

}
