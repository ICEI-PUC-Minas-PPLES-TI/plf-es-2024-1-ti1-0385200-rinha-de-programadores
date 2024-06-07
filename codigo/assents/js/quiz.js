(function() {
    var questions = [{
        question: "Qual é a saída do seguinte código Python?\n```python\nprint('Olá, Mundo!')\n```",
        choices: ["Olá, Mundo!", "ola, mundo!", "Erro de Sintaxe", "Nenhuma das anteriores"],
        correctAnswer: 0
      }, {
        question: "Qual das seguintes opções é uma maneira correta de declarar um array em C?",
        choices: ["int array[10];", "array int[10];", "int array;", "array[10] int;"],
        correctAnswer: 0
      }, {
        question: "Qual é a sintaxe correta para definir uma função em Python?",
        choices: ["function minhaFuncao():", "def minhaFuncao():", "func minhaFuncao():", "define minhaFuncao():"],
        correctAnswer: 1
      }, {
        question: "Qual das seguintes é a maneira correta de criar um objeto em Java?",
        choices: ["MinhaClasse obj = new MinhaClasse();", "MinhaClasse obj = MinhaClasse();", "new MinhaClasse obj;", "obj = new MinhaClasse();"],
        correctAnswer: 0
      }, {
        question: "Qual é a extensão de arquivo correta para arquivos Python?",
        choices: [".java", ".py", ".c", ".python"],
        correctAnswer: 1
      }, {
        question: "Qual das seguintes funções é usada para encontrar o comprimento de uma string em C?",
        choices: ["length(str)", "strlength(str)", "strlen(str)", "len(str)"],
        correctAnswer: 2
      }, {
        question: "Como você adiciona um comentário em Java?",
        choices: ["# Este é um comentário", "// Este é um comentário", "/* Este é um comentário */", "-- Este é um comentário"],
        correctAnswer: 1
      }, {
        question: "Em Python, qual palavra-chave é usada para criar uma classe?",
        choices: ["class", "define", "create", "function"],
        correctAnswer: 0
      }, {
        question: "Qual é a maneira correta de iniciar um loop for em C?",
        choices: ["for (int i = 0; i < 10; i++)", "for i in range(10):", "for (int i; i < 10; i++)", "foreach (int i in range(10))"],
        correctAnswer: 0
      }, {
        question: "Qual método é usado para imprimir algo no console em Java?",
        choices: ["print()", "printf()", "System.out.print()", "cout <<"],
        correctAnswer: 2
      }, {
        question: "Qual é a função usada para ler uma linha inteira de entrada no Python?",
        choices: ["input()", "raw_input()", "scan()", "readline()"],
        correctAnswer: 0
      }, {
        question: "Qual é o operador lógico 'E' em Python?",
        choices: ["&&", "||", "and", "&"],
        correctAnswer: 2
      }, {
        question: "Como você declara uma variável constante em C?",
        choices: ["const int x = 10;", "final int x = 10;", "constant int x = 10;", "int const x = 10;"],
        correctAnswer: 0
      }, {
        question: "Qual das seguintes é uma estrutura de repetição em Java?",
        choices: ["repeat...until", "foreach", "do...while", "for...in"],
        correctAnswer: 2
      }, {
        question: "Como você define um método estático em uma classe Java?",
        choices: ["static void metodo()", "void static metodo()", "method static void()", "static method void()"],
        correctAnswer: 0
      }];
  
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Por favor escolha uma alternativa!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('Você acertou ' + numCorrect + ' em um total de ' +
                   questions.length + 'questões');
      return score;
    }
  })();