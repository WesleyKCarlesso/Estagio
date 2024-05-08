import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  options = ["1", "2", "3", "4"];
  selectedOption = this.options[0];

  ngOnInit() {
    const userLoggedString = localStorage.getItem("user_logged");

    this.isLogged = !!userLoggedString;
  }

  onDropdownChange(option: string) {
    console.log(option);
  }
}
