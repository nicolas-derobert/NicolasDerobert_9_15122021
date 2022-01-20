/**
 * @jest-environment jsdom
 */

// import { screen } from "@testing-library/dom"
// import NewBillUI from "../views/NewBillUI.js"
// import NewBill from "../containers/NewBill.js"


// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then ...", () => {
//       const html = NewBillUI()
//       document.body.innerHTML = html
//       //to-do write assertion
//     })
//   })
// })

import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes";
import { localStorageMock } from "../__mocks__/localStorage.js";
import store from "../__mocks__/store";
import router from "../app/Router.js";
import { bills } from "../fixtures/bills";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    beforeEach(() => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const html = NewBillUI();
      document.body.innerHTML = html;
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        bills,
        localStorage: window.localStorage,
      });
    });
    test("Then the right page is displayed", () => {
      expect(screen.getByText("Envoyer une note de frais")).toBeTruthy();
    });
    test("All the input elements are diplayed", () => {
      expect(screen.getByTestId("expense-type")).toBeTruthy();
      expect(screen.getByPlaceholderText("Vol Paris Londres")).toBeTruthy();
      expect(screen.getByTestId("expense-type")).toBeTruthy();
      expect(screen.getByTestId("datepicker")).toBeTruthy();
      expect(screen.getByTestId("amount")).toBeTruthy();
      expect(screen.getByTestId("vat")).toBeTruthy();
      expect(screen.getByTestId("pct")).toBeTruthy();
      expect(screen.getByTestId("commentary")).toBeTruthy();
      expect(screen.getByTestId("file")).toBeTruthy();
    });
    afterEach(() => {
      document.body.innerHTML = "";
    });
  });
});
describe("Given I am connected as an employee and I am on NewBill Page", () => {
  describe("When I click the button to add document", () => {

    test("Then the handleChangeFile method is called", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
      const fileTrue = "test.png";
      let input = screen.getByTestId("file");
      input.addEventListener("input", handleChangeFile);
      fireEvent.input(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
    afterEach(() => {
      document.body.innerHTML = "";
    });
  });
});

describe("Given I am connected as an employee and I am on NewBill Page", () => {
  describe("When I click the submit button", () => {
    beforeEach(() => {});
    test("The click event is listened   ", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const submitMethod = jest.spyOn(newBill, "handleSubmit");
      const submitElement = screen.getByTestId("form-new-bill");
      submitElement.addEventListener("submit", submitMethod);
      fireEvent.submit(submitElement);
      expect(submitMethod).toHaveBeenCalled();
      jest.restoreAllMocks();
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });
  });
});

describe("Given I am a user connected as Employee", () => {
  describe("When I post a new bill", () => {
    test("Then fetches bills from mock API POST", async () => {
      const postSpy = jest.spyOn(store, "post");
      const bills = await store.post();
      expect(postSpy).toHaveBeenCalledTimes(1);
    });
  });
});


    beforeEach(() => {

    });
    test("The click event is listened", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const html = NewBillUI();
      document.body.innerHTML = html;
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      let input = screen.getByTestId("file");
      const handleChangeFile = jest.fn((e) => e.preventDefault());
      input.addEventListener("click", handleChangeFile);
      fireEvent.click(input);
      expect(handleChangeFile).toHaveBeenCalled();
    });

    test("The file is uploaded avec spyOn and ALERT", () => {
      // const pathname = ROUTES_PATH['NewBill']
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const alertMock = jest.spyOn(window, "alert");

      const file = new File(["file"], "hello.gif", { type: "image/gif" });
      const input = screen.getByTestId("file");

      userEvent.upload(input, file);
      expect(alertMock).toHaveBeenCalled();
    });
    test("The file is uploaded avec spyOn and ALERT sans INSTANCE", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;

      const alertMock = jest.spyOn(window, "alert");

      const file = new File(["file"], "hello.gif", { type: "image/gif" });
      const input = screen.getByTestId("file");
      input.addEventListener("input", alertMock);

      userEvent.upload(input, file);
      expect(alertMock).toHaveBeenCalled();
    });
    test("The file is uploaded avec spyOn and NO ALERT", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const alertMock = jest.spyOn(window, "alert");

      const file = new File(["file"], "hello.png", { type: "image/png" });
      const input = screen.getByTestId("file");

      userEvent.upload(input, file);
      expect(alertMock).toHaveBeenCalledTimes(0);
    });
    test("The file is uploaded avec spyOn", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.spyOn(newBill, "handleChangeFile");
      const fileTrue = new File(["testFile"], "testFile.jpg", {
        type: "image/png",
      });
      // let val = "C:\\fakepath\\Capture dâ€™Ã©cran 2021P-12-16 084302.png";
      let input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      console.log();
      // fireEvent.change(input, {
      //   target: {
      //     files: [file0]
      //   }PP
      // });
      // const input = screen.getByLabelText(/upload file/i)
      userEvent.upload(input, fileTrue);

      expect(newBill.handleChangeFile).toHaveBeenCalled;
      // expect(input.files.item(0)).toStrictEqual(myFile);
      // expect(input.files).toHaveLength(1);
    });
    test("The file is uploaded avec spyOn and Trigger INPUT", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      let input = screen.getByTestId("file");
      const handleChangeFile = jest.spyOn(newBill, "handleChangeFile");
      const fileTrue = new File(["testFile"], "testFile.jpg", {
        type: "image/png",
      });

      input.addEventListener("change", handleChangeFile);
      input.dispatchEvent(new Event("change"));
      expect(newBill.handleChangeFile).toHaveBeenCalled;
    });
    test("The file is uploaded avec spyOn and Trigger INPUT et changement ordre", () => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const html = NewBillUI();
      document.body.innerHTML = html;
      let input = screen.getByTestId("file");
      const handleChangeFile = jest.spyOn(newBill, "handleChangeFile");
      const fileTrue = new File(["testFile"], "testFile.jpg", {
        type: "image/png",
      });

      input.addEventListener("change", handleChangeFile);
      input.dispatchEvent(new Event("change"));
      expect(newBill.handleChangeFile).toHaveBeenCalled;
    });
    test("The file is uploaded avec spyOn et drop", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.spyOn(newBill, "handleChangeFile");
      const fileTrue = new File(["testFile"], "testFile.jpg", {
        type: "image/png",
      });
      // let val = "C:\\fakepath\\Capture dâ€™Ã©cran 2021P-12-16 084302.png";
      let input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      // fireEvent.change(input, {
      //   target: {
      //     files: [file0]
      //   }PP
      // });
      // const input = screen.getByLabelText(/upload file/i)
      userEvent.upload(input, fileTrue);

      fireEvent.drop(input, {
        dataTransfer: {
          files: [
            new File(["(âŒâ–¡_â–¡)"], "chucknorris.png", { type: "image/png" }),
          ],
        },
      });

      expect(newBill.handleChangeFile).toHaveBeenCalled;
      // expect(input.files.item(0)).toStrictEqual(myFile);
      // expect(input.files).toHaveLength(1);
    });
    test("The file is uploaded avec spyOn et router.js", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      window.location.assign(ROUTES_PATH["NewBill"]);
      document.body.innerHTML = '<div id="root"></div>';
      router();
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.spyOn(newBill, "handleChangeFile");
      const fileTrue = new File(["testFile"], "testFile.jpg", {
        type: "image/png",
      });
      // let val = "C:\\fakepath\\Capture dâ€™Ã©cran 2021P-12-16 084302.png";
      let input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      console.log();
      // fireEvent.change(input, {
      //   target: {
      //     files: [file0]
      //   }PP
      // });
      // const input = screen.getByLabelText(/upload file/i)
      userEvent.upload(input, fileTrue);

      expect(newBill.handleChangeFile).toHaveBeenCalled;
      // expect(input.files.item(0)).toStrictEqual(myFile);
      // expect(input.files).toHaveLength(1);
    });
    test("The file is uploaded avec jest.fn et this", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(newBill.handleChangeFile(this));
      const fileTrue = "test.png";
      let input = screen.getByTestId("file");
      input.addEventListener("input", handleChangeFile);
      fireEvent.input(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
    test("The file is uploaded avec jest.fn et change avec File", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(()=>(newBill.handleChangeFile));
      let input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      fireEvent.change(input, {
        target: {
          files: [
            new File(["file"], "image.png", {
              type: "image/png",
            }),
          ],
        },
      });
      expect(handleChangeFile).toHaveBeenCalled();
    });
    test("The file is uploaded avec jest.fn et file", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const fileTrue = "test.png";
      const handleChangeFile = jest.fn(newBill.handleChangeFile(fileTrue));
      let input = screen.getByTestId("file");
      input.addEventListener("input", handleChangeFile);
      fireEvent.input(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
    test("The file is uploaded avec jest.fn et bind et file", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const fileTrue = "test.png";
      const handleChangeFile = jest.fn(
        newBill.handleChangeFile.bind(this, fileTrue)
      );
      let input = screen.getByTestId("file");
      input.addEventListener("input", handleChangeFile);
      fireEvent.input(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
    test("The file is uploaded avec jest.fn et bind et this", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const fileTrue = "test.png";
      const handleChangeFile = jest.fn(newBill.handleChangeFile.bind(this));
      let input = screen.getByTestId("file");
      input.addEventListener("input", handleChangeFile);
      fireEvent.input(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
    test("The file is uploaded avec jest.fn et event change", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "employee@test.tld",
          password: "employee",
          status: "connected",
        })
      );
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const newBill = new NewBill({
        document,
        onNavigate,
        store: null,
        localStorage: window.localStorage,
      });
      const fileTrue = "test.png";
      const handleChangeFile = jest.fn(newBill.handleChangeFile.bind(this));
      let input = screen.getByTestId("file");
      input.addEventListener("change", handleChangeFile);
      fireEvent.change(input, fileTrue);
      expect(handleChangeFile).toHaveBeenCalled();
    });
