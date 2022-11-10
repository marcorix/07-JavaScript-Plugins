import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["checkbox"]

  connect() {
    console.log("The 'check_all_checkboxes' controller is now loaded!");
  }

  checkAll(event) {
    console.log(event.currentTarget.checked);
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.checked = event.currentTarget.checked;
    });
  }
}
