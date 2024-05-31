import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/domain/pets/entities/pet.model';
import { PetService } from 'src/app/domain/pets/services/pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent {
  petForm!: FormGroup;
  petView!: Pet;
  imageUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router,
  ) {}

  ngOnInit(): void{


    const url = window.location.href;
    const partesURL = url.split('/');
    const id = partesURL[partesURL.length - 1];

    this.generateReactiveForm();
    console.log(id);

    this.petService.getPetById(id).subscribe((data)=>{
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
      const pet: Pet = {
        name: this.petForm.value.name,
        specie: this.petForm.value.specie,
        age: this.petForm.value.age,
        sex: this.petForm.value.sex,
        size: this.petForm.value.size,
        perimeter: this.petForm.value.perimeter,
        image: this.petForm.value.image,
        id: this.petView.id,
      }
      this.petService.updatePet(this.petView?.id,pet).subscribe(
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
