    // Your JavaScript code goes here

    window.onload = function () {
      // Clear the form fields on page load
      document.getElementById("form").reset()
      document.getElementById("submit").disabled = true
      document.getElementById("formProtocolo").reset()
      document.getElementById("submitProtocolo").disabled = true
      document.getElementById("escola").disabled = true;
      document.getElementById("escola2").disabled = true;
      document.getElementById("escola3").disabled = true;
    }

    const url = 'https://script.google.com/macros/s/AKfycbxlkGzm268klpBOfZI7YYoQdIuHkaLdwfRkAAP-W78gMghhcXRyn4ZprF9b5JV2f5Af/exec'

    window.addEventListener("load", function () {
      const form = document.getElementById("form")
      const submitBtn = document.getElementById("submit")
      const responseMessage = document.getElementById("responseMessage")
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        startLoading(submitBtn);

        const data = new FormData(form)

        for (let [key, value] of data.entries()) {
          data.set(key, value.toUpperCase())
        }

        fetch(url, {
          method: "POST",
          body: data,
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          endLoading(submitBtn);
          document.getElementById("form").reset();
          document.getElementById("submit").disabled = true;
          document.getElementById("escola").disabled = true;
          document.getElementById("escola2").disabled = true;
          document.getElementById("escola3").disabled = true;
          Object.assign(responseMessage.style, {
            color: "green",
            textAlign: "center",
            marginBottom: "15px",
            marginTop: "15px",
            visibility: "visible",
          })
            alert(`Formulário enviado com sucesso! Protocolo: ${data.protocol}`)
          responseMessage.textContent = `Formulário enviado com sucesso! Protocolo: ${data.protocol}`
        })
        .catch((error) => {
          endLoading(submitBtn);
          document.getElementById("form").reset();
          document.getElementById("submit").disabled = true;
          document.getElementById("escola").disabled = true;
          document.getElementById("escola2").disabled = true;
          document.getElementById("escola3").disabled = true;
          console.error("Error:", error)
          Object.assign(responseMessage.style, {
            color: "#cc0000",
            textAlign: "center",
            marginBottom: "15px",
            marginTop: "15px",
            visibility: "visible",
          })
          responseMessage.textContent = "Não foi possível alcançar o servidor. Tente novamente mais tarde.";
        })
      })

      const formProtocolo = document.getElementById("formProtocolo")
      const formMessage = document.getElementById("mensagemProtocolo")
      const inputProtocolo = document.getElementById("inputProtocolo")
      const protocolBtn = document.getElementById("submitProtocolo")
      formProtocolo.addEventListener("submit", function(e) {
        e.preventDefault();
        startLoading(protocolBtn);
        const num = inputProtocolo.value;
        
        fetch(url + "?protocol=" + num)
          .then(response => {
            if(!response.ok) {
              throw new Error('Network repsonse was not ok');
            }
            return response.json();
          })
          .then(data => {
            endLoading(protocolBtn);
            const bool = Boolean(data.result);
            if(bool) {
              document.getElementById("formProtocolo").reset();
              document.getElementById("submitProtocolo").disabled = true;
              formMessage.textContent = `O Aluno do Protocolo ${num} encontra-se cadastrado no sistema.`
              Object.assign(formMessage.style, {
                color: "green",
                textAlign: "center",
                visibility: "visible",
              })
            } else {
              document.getElementById("formProtocolo").reset();
              document.getElementById("submitProtocolo").disabled = true;
              formMessage.textContent = "O cadastro não foi encontrado no sistema."
              Object.assign(formMessage.style, {
                color: "#cc0000",
                textAlign: "center",
                visibility: "visible",
              })
            }
          })
          .catch(error => {
            endLoading(protocolBtn);
            document.getElementById("formProtocolo").reset();
            document.getElementById("submitProtocolo").disabled = true;
            formMessage.textContent = "Não foi possível alcançar o servidor. Tente novamente mais tarde."
            Object.assign(formMessage.style, {
              color: "#cc0000",
              textAlign: "center",
              visibility: "visible",
            })
            console.error('Error:', error);
          })

      })
    })

    function startLoading(button) {
      button.disabled = true;
      button.classList.add("loading");
      button.value = "Carregando...";
    }

    function endLoading(button) {
      button.value = "Enviar";
      button.disabled = false;
      button.classList.remove("loading");
    }

    function errorMessage(input, bool, msg) {
      if(bool) {
        input.input.classList.remove("genError");
        input.label.classList.remove("genError");
      } else {
        input.input.classList.add("genError");
        input.label.classList.add("genError");
      }
    }
    
    function validateEmail(input) {
        // Regular expression for validating an email address
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const value = input.value.trim(); // Trim whitespace from input
        const inputs = {
          input: document.getElementById('email'),
          label: document.getElementById('emailLabel')
        };

        // Check if the email matches the pattern
        if (emailPattern.test(value)) {
          errorMessage(inputs, true);            
        } else {
          errorMessage(inputs, false);
        }
    }

    // Formatting functions

    function formatNum(input) {
      const value = input.value.replace(/\D/g, "")
      input.value = value
    }

    function formatProtocol(input) {
      const value = input.value.replace(/\D/g, "")
      input.value = value
    }

    function formatCEP(input) {
      const value = input.value.replace(/\D/g, "")
      const inputs = {
        input: document.getElementById('cep'),
        label: document.getElementById('cepLabel')
      };

      if (value.length === 8) {
        input.value = value.slice(0, 5) + "-" + value.slice(5, 8)
        errorMessage(inputs, true);
      } else {
        input.value = value
        errorMessage(inputs, false);
      }
    }

    function formatTelefone(input) {
      const value = input.value.replace(/\D/g, "") // Remove non-digit characters
      const inputs = {
        input: document.getElementById('telefone'),
        label: document.getElementById('telefoneLabel')
      };

      if (value.length === 10) {
        // Format for 10 digits: (xx)xxxx-xxxx
        errorMessage(inputs, true);
        input.value =
          "(" +
          value.slice(0, 2) +
          ")" +
          value.slice(2, 6) +
          "-" +
          value.slice(6)
      } else if (value.length === 11) {
        // Format for 11 digits: (xx)xxxxx-xxxx
        errorMessage(inputs, true);
        input.value =
          "(" +
          value.slice(0, 2) +
          ")" +
          value.slice(2, 7) +
          "-" +
          value.slice(7)
      } else {
        // If not 10 or 11 digits, just show the raw value
        input.value = value
        errorMessage(inputs, false);
      }
    }

    function formatSUS(input) {
      const value = input.value.replace(/\D/g, "")
      const inputs = {
        input: document.getElementById('cartao_sus'),
        label: document.getElementById('susLabel')
      };
      if(value.length === 15) {
        errorMessage(inputs, true);
        input.value = value
      } else {
        errorMessage(inputs, false);
        input.value = value
      }
      
    }

    function formatCPF(input) {
      const value = input.value.replace(/\D/g, "") // Remove non-digit characters
      const inputs = {
        input: document.getElementById('cpf_responsavel'),
        label: document.getElementById('cpfLabel')
      };

      // Validate CPF length
      if (value.length > 11) {
        input.value = value.slice(0, 11) // Limit to 11 digits
        return
      }

      // Format the CPF
      if (value.length === 11) {
        input.value =
          value.slice(0, 3) +
          "." +
          value.slice(3, 6) +
          "." +
          value.slice(6, 9) +
          "-" +
          value.slice(9)

        // Validate the CPF
        if (!isValidCPF(value)) {
          alert("CPF inválido!") // You can change this to whatever feedback you prefer
          input.value = "" // Clear the input if invalid
        } else {
          errorMessage(inputs, true);
        }
        document.getElementById("cpf_responsavel").style.borderColor = "";
      } else {
        // If not 11 digits, just show the raw value
        input.value = value;
        if (input.value.length !== 11) {
          errorMessage(inputs, false);
        }
      }
    }

    function isValidCPF(cpf) {
      // Check if all digits are the same
      if (/^(\d)\1{10}$/.test(cpf)) {
        return false // Invalid CPF (e.g., 111.111.111-11)
      }

      // CPF validation logic
      let sum = 0
      let remainder

      // Validate first check digit
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      if (remainder !== parseInt(cpf.charAt(9))) {
        return false // Invalid CPF
      }

      sum = 0 // Reset sum for the second check digit
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      return remainder === parseInt(cpf.charAt(10)) // Valid CPF if both check digits match
    }

    function formatRenda(input) {
      const value = input.value.replace(/\D/g, "")
      input.value = value
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      if (!value) input.value = ""
      input.value = "R$ " + input.value
    }

    // Função para atualizar a turma com base na data de nascimento
    function updateTurma() {
      const dobInput = document.getElementById("data_nascimento").value
      const turmaInput = document.getElementById("turma")

      if (dobInput) {
        const [year, month, day] = dobInput.split("-").map(Number)
        const dob = new Date(year, month - 1, day) // mês é 0-indexado

        // Define os intervalos de data para cada turma
        const maternal2Start = new Date(2021, 3, 1)
        const maternal2End = new Date(2022, 2, 31)
        const maternal1Start = new Date(2022, 3, 1)
        const maternal1End = new Date(2023, 2, 31)
        const berçario2Start = new Date(2023, 3, 1)
        const berçario2End = new Date(2024, 2, 31)
        const berçario1Start = new Date(2024, 3, 1)
        const berçario1End = new Date(2024, 6, 20)

        // Determina a turma com base na data de nascimento
        if (dob >= maternal2Start && dob <= maternal2End) {
          turmaInput.textContent = "Maternal 2"
        } else if (dob >= maternal1Start && dob <= maternal1End) {
          turmaInput.textContent = "Maternal 1"
        } else if (dob >= berçario2Start && dob <= berçario2End) {
          turmaInput.textContent = "Berçário 2"
        } else if (dob >= berçario1Start && dob <= berçario1End) {
          turmaInput.textContent = "Berçário 1"
        } else {
          turmaInput.textContent = "" // Limpa se não houver correspondência
        }

        // Atualiza as opções de escolas
        populateSchoolOptions()
      } else {
        turmaInput.textContent = "" // Limpa se não houver data
      }
    }

    const schools = [
      "CMEI ALVINA GOLDINHO SILVESTRE (Mandiocaba)",
      "CMEI ALZIRA MENDONÇA FIGUEIRA (Conj Flavio Giovine)",
      "CMEI ANTONIA AYRES DE OLIVEIRA (Monte Cristo)",
      "CMEI AVELINO DAL-PRÁ (3 Conjuntos)",
      "CMEI AYRTON SENNA DA SILVA-CAIC (Vila Operaria)",
      "CMEI CECILIA VECHIATTI GIOVINE (Simone)",
      "CMEI JACÓ DE JESUS SOUZA (Vila Operaria)",
      "CMEI LUCILENE DOS SANTOS RODRIGUES (São Jorge)",
      "CMEI MARIA MADALENA FERNANDES DE SOUZA (Morumbi)",
      "CMEI MENINA ISABELA DE SOUZA DA SILVA (Ouro Branco)",
      "CMEI MENINO DAVI (Vila Operaria)",
      "CMEI NOSSA SENHORA DO CARMO GRACIOSA",
      "CMEI NOSSA SENHORA DO CARMO PARANAVAÍ (Jd. Maringa)",
      "CMEI ROSÂNGELA BERTO CASSORILLO (Centro)",
      "CMEI TIA IRENE MARTOS ROCHA (Sumaré)",
      "CEI ANÍBAL AGITA (Centro)",
      "CEI INFÂNCIA FELIZ (Sumaré)",
      "CEI EDUCANDÁRIO SÃO JOSÉ (Ipê)",
      "CEI PEQUENINOS DE SANTA RITA (Morumbi)",
      "CEI SANTA TEREZNHA DO MENINO JESUS (Santos Dumont)",
      "CEI SEMENTE DA ESPERANÇA (São Jorge)",
      "CEI PEQUENO SEMELHANTE (São Jorge)",
      "CEI CASA DA CRIANÇA (Vila Operaria)",
    ]

    const schoolsB1 = [
      "CMEI ALVINA GOLDINHO SILVESTRE (Mandiocaba)",
      "CMEI ALZIRA MENDONÇA FIGUEIRA (Conj Flavio Giovine)",
      "CMEI ANTONIA AYRES DE OLIVEIRA (Monte Cristo)",
      "CMEI AVELINO DAL-PRÁ (3 Conjuntos)",
      "CMEI AYRTON SENNA DA SILVA-CAIC (Vila Operaria)",
      "CMEI CECILIA VECHIATTI GIOVINE (Simone)",
      "CMEI JACÓ DE JESUS SOUZA (Vila Operaria)",
      "CMEI LUCILENE DOS SANTOS RODRIGUES (São Jorge)",
      "CMEI MENINA ISABELA DE SOUZA DA SILVA (Ouro Branco)",
      "CMEI MENINO DAVI (Vila Operaria)",
      "CMEI NOSSA SENHORA DO CARMO GRACIOSA",
      "CMEI NOSSA SENHORA DO CARMO PARANAVAÍ (Jd. Maringa)",
      "CMEI ROSÂNGELA BERTO CASSORILLO (Centro)",
      "CMEI TIA IRENE MARTOS ROCHA (Sumaré)",
      "CEI ANÍBAL AGITA (Centro)",
      "CEI SANTA TEREZNHA DO MENINO JESUS (Santos Dumont)",
    ]

    function populateSchoolOptions() {
      const turmaValue = document.getElementById("turma").value
      const selects = [
        document.getElementById("escola"),
        document.getElementById("escola2"),
        document.getElementById("escola3"),
      ]

      if (turmaValue == "") {
        selects.forEach((select) => {
          select.disabled = true
          select.innerHTML =
            '<option value="" disabled selected>Escolha uma Instituição</option>'
        })
      } else if (turmaValue == "Berçário 1") {
        selects.forEach((select) => {
          select.disabled = true
          select.innerHTML =
            '<option value="" disabled selected>Escolha uma Instituição</option>'
          schoolsB1.forEach((school) => {
            const option = document.createElement("option")
            option.value = school
            option.textContent = school
            select.appendChild(option)
          })
          select.disabled = false
        })
      } else {
        selects.forEach((select) => {
          select.disabled = true
          select.innerHTML =
            '<option value="" disabled selected>Escolha uma Instituição</option>'
          schools.forEach((school) => {
            const option = document.createElement("option")
            option.value = school
            option.textContent = school
            select.appendChild(option)
          })
          select.disabled = false
        })
      }
    }

    function updateSchoolOptions() {
      const selects = [
        document.getElementById("escola"),
        document.getElementById("escola2"),
        document.getElementById("escola3"),
      ]

      const selectedSchools = [
        document.getElementById("escola").value,
        document.getElementById("escola2").value,
        document.getElementById("escola3").value,
      ]

      selects.forEach((select, index) => {
        Array.from(select.options).forEach((option) => {
          if (
            selectedSchools.includes(option.value) &&
            option.value !== select.value
          ) {
            option.style.display = "none"
          } else {
            option.style.display = "block"
          }
        })
      })
    }

    function swapForm() {
      const divProtocolo = document.getElementById("divProtocolo");
      const divForm = document.getElementById("form-dados");
      const btnSwap = document.getElementById("swapForm");

      divProtocolo.style.display = (divProtocolo.style.display === "none") ? "block" : "none";
      divForm.style.display = (divForm.style.display === "none") ? "block" : "none";
      btnSwap.value = (btnSwap.value === "Verificar Cadastro") ? "Formulário de Cadastro" : "Verificar Cadastro";
    }

    // Add event listeners for each select
    document
      .getElementById("escola")
      .addEventListener("change", updateSchoolOptions)
    document
      .getElementById("escola2")
      .addEventListener("change", updateSchoolOptions)
    document
      .getElementById("escola3")
      .addEventListener("change", updateSchoolOptions)

    const inputsForm1 = document.querySelectorAll(
      "#form input[required], #form select[required]",
    )
    const inputsForm2 = document.querySelectorAll(
      "#formProtocolo input[required]",
    )
    inputsForm1.forEach((input) => {
      input.addEventListener("input", updateSubmitButton)
    })
    inputsForm2.forEach((input) => {
      input.addEventListener("input", updateSubmitButton)
    })

    function updateSubmitButton() {
      const allFilledForm1 = [...inputsForm1].every((input) => input.value);
      const hasGenError = [...inputsForm1].some((input) => input.classList.contains("genError"));
      const allFilledForm2 = [...inputsForm2].every((input) => input.value);
      document.getElementById("submit").disabled = !allFilledForm1 || hasGenError;
      document.getElementById("submitProtocolo").disabled = !allFilledForm2;
    }

    document.getElementById("swapForm").addEventListener("click", swapForm);
