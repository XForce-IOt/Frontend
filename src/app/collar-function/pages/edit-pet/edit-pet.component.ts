import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/collar-function/model/pet.model';
import { PetService } from 'src/app/collar-function/services/pet.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent {
  petForm!: FormGroup;
  petView!: any;
  imageUrl!: string;
  userId: number | null = null;

  constructor(private translate: TranslateService,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router,
    private authService: AuthService
  ) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }

  ngOnInit(): void{

    this.userId = this.authService.getUserId();
    const url = window.location.href;
    const partesURL = url.split('/');
    const id = partesURL[partesURL.length - 1];

    this.generateReactiveForm();
    console.log(id);

    this.petService.getPetById(this.userId, id).subscribe((data)=>{
        this.petView = data;
        this.petForm.patchValue({
          name: this.petView.name,
          specie: this.petView.specie,
          age: this.petView.age,
          sex: this.petView.sex,
          size: this.petView.size,
          perimeter: this.petView.perimeter,
          image: this.petView.image,
        })
        console.log(this.petView)
        console.log(data)
      }
    )
  }

  generateReactiveForm(): void{
    this.petForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      specie: ['',[Validators.required]],
      age: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      size: ['',[Validators.required]],
      perimeter: ['',[Validators.required]],
      image: ['',[Validators.required]]
    })
  }

  updatePetView(){
    if(this.petForm.invalid){
      console.log('Formulario invalido');
    } else {
      const pet: any = {
        name: this.petForm.value.name,
        specie: this.petForm.value.specie,
        age: this.petForm.value.age,
        sex: this.petForm.value.sex,
        size: this.petForm.value.size,
        perimeter: this.petForm.value.perimeter,
        image: this.petForm.value.image,
        petId: this.petView.id,
        petOwnerId:this.petView.id

      }
      this.petService.updatePet(this.userId, this.petView.id, pet).subscribe(
        (data)=>(
          console.log(data),
          this.router.navigate(['/home/pets'])
        ),
        (error)=>(console.log(error))

      )
    }
  }
  onSubmit(){
    this.updatePetView();
  }
}
