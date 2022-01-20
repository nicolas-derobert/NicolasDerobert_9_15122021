/**
 * @jest-environment jsdom
 */

// import { screen } from "@testing-library/dom"
// import BillsUI from "../views/BillsUI.js"
// import { bills } from "../fixtures/bills.js"

// describe("Given I am connected as an employee", () => {
//   describe("When I am on Bills Page", () => {
//     test("Then bill icon in vertical layout should be highlighted", () => {
//       const html = BillsUI({ data: []})
//       document.body.innerHTML = html
//       //to-do write expect expression
//     })
//     test("Then bills should be ordered from earliest to latest", () => {
//       const html = BillsUI({ data: bills })
//       document.body.innerHTML = html
//       const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
//       const antiChrono = (a, b) => ((a < b) ? 1 : -1)
//       const datesSorted = [...dates].sort(antiChrono)
//       expect(dates).toEqual(datesSorted)
//     })
//   })
// })
import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { ROUTES, ROUTES_PATH } from "../constants/routes";
import { localStorageMock } from "../__mocks__/localStorage.js";
import { bills } from "../fixtures/bills.js";
import router from "../app/Router.js";
import BillsUI from "../views/BillsUI.js";
// import VerticalLayout from "../views/VerticalLayout";
import { formatDate } from "../app/format.js";

import Bills from "../containers/Bills.js";
import { route } from "express/lib/application";
import store from "../__mocks__/store";

const data = bills;
const loading = true;
const error = null;

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="root"></div>';
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
    });

    test("Then the bill page title should be displayed", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      expect(screen.getByText("Mes notes de frais")).toBeTruthy();
    });
    test("Then the bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const store = null;
      let myBills = new Bills({ document, onNavigate, store, localStorage });
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => (a < b ? 1 : -1);
      const dateFormatedBench = [...dates].map((date) => formatDate(date));
      const datesSortedBench = [...dateFormatedBench].sort(antiChrono);
      const initialFormated = [...dates].map((date) => formatDate(date));
      const initialDateSorted = [...initialFormated].sort(myBills.sortDate);

      expect(initialDateSorted).toEqual(dateFormatedBench);
    });

    test("Then bill icon in vertical layout should be highlighted", () => {
      window.location.assign(ROUTES_PATH["Bills"])
      document.body.innerHTML = '<div id="root"></div>';
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      router();
      const icone = screen.getByTestId("icon-window");
      console.log(icone);
      expect(
        screen.getByTestId("icon-window").classList.contains("active-icon")
      ).toBe(true);
    });
    test("Then error page render", () => {
      const html = BillsUI({
        data: null,
        loading: null,
        error: "errormessage",
      });
      document.body.innerHTML = html;
      expect(html).toContain("errormessage");
    });
  });
});
describe("Given I am connected as employee, and bill page is displayed", () => {
  describe("When I click on the icon eye", () => {
    // test("Then a modal should open to display bills", () => {
    //   Object.defineProperty(window, "localStorage", {
    //     value: localStorageMock,
    //   });
    //   const user = JSON.stringify({
    //     type: "Employee",
    //   });
    //   window.localStorage.setItem("user", user);
    //   const html = BillsUI({ data: bills });
    //   document.body.innerHTML = html;
    //   const modale = screen.getByTestId("modaleFile");
    //   expect(modale).toBeTruthy();
    // });
    test("Then ClickIconEye method should be fired", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const store = null;
      const html = BillsUI({ data: bills });

      document.body.innerHTML = html;

      let myBills = new Bills({ document, onNavigate, store, localStorage });
      const eyes = screen.getAllByTestId("icon-eye");
      $.fn.modal = jest.fn();
      const handleClickIconEyeSpyMethode = jest.spyOn(
        myBills,
        "handleClickIconEye"
      );
      eyes[0].addEventListener("click", handleClickIconEyeSpyMethode(eyes[0]));
      fireEvent.click(eyes[0]);
      expect(handleClickIconEyeSpyMethode).toHaveBeenCalled();
      jest.restoreAllMocks();
    });
  });
  describe("When I click on the button 'New bill'", () => {
    test("Then NewBill method should be fired", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const store = null;
      const html = BillsUI({ data: bills });

      document.body.innerHTML = html;
      let input = screen.getByTestId("btn-new-bill");

      let myBills = new Bills({ document, onNavigate, store, localStorage });
      const handleClickNewBillSpyMethode = jest.spyOn(
        myBills,
        "handleClickNewBill"
      );
      input.addEventListener("click", handleClickNewBillSpyMethode);
      fireEvent.click(input);
      expect(handleClickNewBillSpyMethode).toHaveBeenCalled();
      jest.restoreAllMocks();
    });
  });
});

describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills", () => {
    test("fetches bills from mock API GET", async () => {
      const getSpy = jest.spyOn(store, "get");
      const bills = await store.get();
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(bills.data.length).toBe(4);
    });
    test("fetches bills from an API and fails with 404 message error", async () => {
      store.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      );
      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 404/);
      expect(message).toBeTruthy();
    });
    test("fetches messages from an API and fails with 500 message error", async () => {
      store.get.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      );
      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 500/);
      expect(message).toBeTruthy();
    });
  });
});
