import { Component, ViewChild, ElementRef, VERSION } from '@angular/core';

@Component({
  selector: 'app-password',
  template: `
    <h1>{{version}}</h1>
    <h3>Password generator</h3>
    <form>
      <input type="passwordLength" (change)="updatePasswordLength($event)" >

      
      <div class="flex">
        <span *ngFor="let checkbox of checkboxes">
          <input type="checkbox" (change)="updateCheckboxValue($event)" id="{{checkbox.id}}" [checked]="checkbox.checked" />
          <label for="{{checkbox.id}}">{{checkbox.label}}</label>
        </span>
      </div>

      <button type="button" (click)="generatePassword()">{{buttonLabel}}</button>
      <div><input id="passwordOutput" #passwordOutput value="{{newPassword}}" />
      </div>

    </form>
    `,

})
export class PasswordComponent {
  // Alternative for checkboxes
  checkboxes = [
    {
      "id": "lowercase",
      "label": "Use lowercase",
      "library": "abcdefghijklmnopqrstuvwxyz",
      "checked": true
    }, {
      "id": "uppercase",
      "label": "Use uppercase",
      "library": "ABCDEFGHIJKLMNOPWRSTUVWXYZ",
      "checked": true
    }, {
      "id": "Use numbers",
      "label": "Use numbers",
      "library": "0123456789",
      "checked": true
    }, {
      "id": "Use symbols",
      "label": "Use symbols",
      "library": "!@#$%^&*-_=+\\|:;',.\<>/?~",
      "checked": false
    }
  ]

  // Declarations
  dictionary: Array<String>;

  lowercase: Boolean = this.checkboxes[0].checked;
  uppercase: Boolean = this.checkboxes[1].checked;
  numbers: Boolean = this.checkboxes[2].checked;
  symbols: Boolean = this.checkboxes[3].checked;

  passwordLenght: Number = 4;
  buttonLabel: String = "Generate";
  color = "blue";
  newPassword: String;

  // Password length
  private updatePasswordLength(event) {
    this.passwordLenght = event.target.value;
  }

  // Checkbox value
  private updateCheckboxValue(event) {
    if (event.target.id == "lowercase")
      this.lowercase = event.target.checked;

    if (event.target.id == "uppercase")
      this.uppercase = event.target.checked;

    if (event.target.id == "numbers")
      this.numbers = event.target.checked;

    if (event.target.id == "symbols")
      this.symbols = event.target.checked;
  }

  // Copy password to clipboard
  @ViewChild('passwordOutput') password: ElementRef;
  private copyPassword() {
    const inputElement = <HTMLInputElement>this.password.nativeElement;
    inputElement.select();
    document.execCommand("copy");
  }

  // Generate password
  private generatePassword() {
    if (this.lowercase === false && this.uppercase === false && this.numbers === false && this.symbols === false) {
      return this.newPassword = "...";
    }

    // Create array from chosen checkboxes
    this.dictionary = [].concat(
      this.lowercase ? this.checkboxes[0].library.split("") : [],
      this.uppercase ? this.checkboxes[1].library.split("") : [],
      this.numbers ? this.checkboxes[2].library.split("") : [],
      this.symbols ? this.checkboxes[3].library.split("") : []
    );

    // Generate random password from array
    var newPassword = "";
    for (var i = 0; i < this.passwordLenght; i++) {
      newPassword += this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.newPassword = newPassword;

  }
}