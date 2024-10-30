    // Your JavaScript code goes here

    window.onload = function () {
      // Clear the form fields on page load
      document.getElementById("form").reset()
      document.getElementById("submit").disabled = true
    }

    window.addEventListener("load", function () {
      const form = document.getElementById("form")
      const responseMessage = document.getElementById("responseMessage")
      form.addEventListener("submit", function (e) {
        e.preventDefault()
        const data = new FormData(form)

        for (let [key, value] of data.entries()) {
          data.set(key, value.toUpperCase())
        }

        const action = e.target.action
        fetch(action, {
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
            document.getElementById("form").reset()
            document.getElementById("submit").disabled = true
            responseMessage.textContent = `Formulário enviado com sucesso! Protocolo: ${data.protocol}`
            responseMessage.style.visibility = "visible"
          })
          .catch((error) => {
            console.error("Error:", error)
          })
      })
    })

    // Formatting functions

    function formatNum(input) {
      const value = input.value.replace(/\D/g, "")
      input.value = value
    }

    function formatCEP(input) {
      const value = input.value.replace(/\D/g, "")
      if (value.length > 5) {
        input.value = value.slice(0, 5) + "-" + value.slice(5, 8)
      } else {
        input.value = value
      }
    }

    function validateEmail(input) {
        // Regular expression for validating an email address
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const value = input.value.trim(); // Trim whitespace from input

        // Check if the email matches the pattern
        if (emailPattern.test(value)) {
          document.getElementById("email").style.borderColor = ""; // Optional: remove invalid class if using CSS for styling
        } else {
          document.getElementById("email").style.borderColor = "#cc0000"; // Optional: add invalid class if using CSS for styling
        }
    }

    function formatTelefone(input) {
      const value = input.value.replace(/\D/g, "") // Remove non-digit characters

      if (value.length === 10) {
        // Format for 10 digits: (xx)xxxx-xxxx
        input.value =
          "(" +
          value.slice(0, 2) +
          ")" +
          value.slice(2, 6) +
          "-" +
          value.slice(6)
      } else if (value.length === 11) {
        // Format for 11 digits: (xx)xxxxx-xxxx
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
      }
    }

    function formatSUS(input) {
      const value = input.value.replace(/\D/g, "")
      input.value = value
    }

    function formatCPF(input) {
      const value = input.value.replace(/\D/g, "") // Remove non-digit characters

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
        }
      } else {
        // If not 11 digits, just show the raw value
        input.value = value
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
          turmaInput.value = "Maternal 2"
        } else if (dob >= maternal1Start && dob <= maternal1End) {
          turmaInput.value = "Maternal 1"
        } else if (dob >= berçario2Start && dob <= berçario2End) {
          turmaInput.value = "Berçário 2"
        } else if (dob >= berçario1Start && dob <= berçario1End) {
          turmaInput.value = "Berçário 1"
        } else {
          turmaInput.value = "" // Limpa se não houver correspondência
        }

        // Atualiza as opções de escolas
        populateSchoolOptions()
      } else {
        turmaInput.value = "" // Limpa se não houver data
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

    const inputs = document.querySelectorAll(
      "#form input[required], #form select[required]",
    )
    inputs.forEach((input) => {
      input.addEventListener("input", updateSubmitButton)
    })

    function updateSubmitButton() {
      const allFilled = [...inputs].every((input) => input.value)
      document.getElementById("submit").disabled = !allFilled
    }
