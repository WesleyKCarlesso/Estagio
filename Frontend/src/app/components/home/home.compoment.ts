import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../../data-services/user.data-service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  options = ["1", "2", "3", "4"];
  selectedOption = this.options[0];

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    const userLoggedString = localStorage.getItem("user_logged");
    this.isLogged = !!userLoggedString;

    console.log(this.userDataService.getAll());

    if (!!userLoggedString) {
      this.isAdmin = JSON.parse(userLoggedString).user.isAdmin;
    }
  }

  onDropdownChange(option: string) {
    console.log(option);
  }
}
