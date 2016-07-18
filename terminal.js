var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ship_db'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    };;
});

var colors = require("colors")
var prompt = require('prompt');
prompt.start();
prompt.message = '';


ship = {
    welcome: function() {
        console.log("");
        console.log("                 WELCOME TO THE BARRACKS OF PIRATES!!!!".red);
        console.log("                 BE READY TO BUILD YOUR ARMY           ".rainbow);
        console.log("");
        console.log("");
        console.log("");
        console.log("");
        console.log("Ob.OOOOOOOo  OOOo.      oOOo.                      .adOOOOOOO".rainbow);
        console.log("Ob.OOOOOOOo  OOOo.      oOOo.                      .adOOOOOOO".rainbow);
        console.log("OboO      .OOo. .oOOOOOo.    OOOo.oOOOOOo..               OO".rainbow);
        console.log(" OOP.oOOOOOOOOOOO  POOOOOOOOOOOo.     OOOOOOOOOP OOOOOOOOOOOB".rainbow);
        console.log("     O OOOO       OOOOo OOOOOOOOOOO  .adOOOOOOOOO oOOO      OOOOo".rainbow);
        console.log(".OOOO              OOOOOOOOOOOOOOOOOOOOOOOOOO              OO".rainbow);
        console.log("OOOOO                 OOOOOOOOOOOOOOOOOOOOOOOOOO           oOO".rainbow);
        console.log("oOOOOOba.                .adOOOOOOOOOOba               .adOOOOo.".rainbow);
        console.log("oOOOOOOOOOOOOOba.    .adOOOOOOOOOO@^OOOOOOOba.     .adOOOOOOOOOOOO".rainbow);
        console.log("OOOOOOOOOOOOOOOOO.OOOOOOOOOOOOOO      OOOOOOOOOOOOO.OOOOOOOOOOOOOO".rainbow);
        console.log("OOOO         YOoOOOOMOIONODOO    .     OOROAOPOEOOOoOY       OOO ".rainbow);
        console.log("  Y            OOOOOOOOOOOOOO: .oOOo. :OOOOOOOOOOO?          : ".rainbow);
        console.log("   :            .oO%OOOOOOOOOOo.OOOOOO.oOOOOOOOOOOOO?         .".rainbow);
        console.log("   .            oOOP %OOOOOOOOoOOOOOOO?oOOOOO?OOOO OOo ".rainbow);
        console.log("       %o  OOOO %OOOO%%OOOOO OOOOOO OOO :".rainbow);
        console.log("             $    OOOO   OY    OOOO   o       ".rainbow);
        console.log("             .                  .     OP          : o     .".rainbow);
        console.log("             .                   . ".rainbow);
        //console.log("             . ");
    },
    menu: function() {
        console.log("Please select what you want to do...");
        console.log("--------------------------------------------------");
        console.log("Enter (add): ------>", "Add a new pirate to the army!");
        console.log("");
        console.log("Enter (update): ------>", "Update info on an marauder");
        console.log("");
        console.log("Enter (visit): ------>", "Visit the pirates in the brig");
        console.log("");
        console.log("Enter (recruit): ------>", "Recruit a Pirate for your army!");
        console.log("");
        console.log("Enter (exit): ------>", "Take sail & go else where");
        console.log("--------------------------------------------------");
    },
    add: function(input_scope) {
        var currentScope = input_scope;
        console.log("To recruit a pirate to your army list the following details of that scallywag");
        console.log("--------------------------------------------------");

        prompt.get(['--->', 'name', 'type', 'age'], function(err, result) {

            connection.query('INSERT INTO pirates (pirateCaptain_id,name,type,age) VALUES (?,?,?,?)', [1, result.name, result.type, result.age], function(err, result) {
                if (err) throw err;
            });
            console.log("ARRG YOU ADDED A Pirate");
            console.log("--------------------------------------------------");

            currentScope.menu();
            currentScope.promptUser();
        });
    },
    visit: function() {
        console.log("How would you like to see the pirates today?");
        console.log("--------------------------------------------------");
        console.log("Enter (I): ------>", "You know the pirate by it's Id visit only it!");
        console.log("");
        console.log("Enter (N): ------>", "You know the pirate by name visit only it!");
        console.log("");
        console.log("Enter (A): ------>", "Count all the pirates in all the ship locations!");
        console.log("");
        console.log("Enter (C): ------>", "Count number of pirate in ship based on city!");
        console.log("");
        console.log("Enter (O): ------>", "Count every pirate in ship with the same type!");
        console.log("");
        console.log("Enter (Q): ------>", "Quit to main menu!");
        console.log("--------------------------------------------------");
    },
    view: function(input_scope) {
        var currentScope = input_scope;
        console.log("Please choice what you like to visit!");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'visit'], function(err, result) {
            if (result.visit == "Q") {
                currentScope.menu();
                currentScope.promptUser();
            } else if (result.visit == "O") {
                currentScope.type(input_scope);
            } else if (result.visit == "I") {
                currentScope.animId(input_scope);
            } else if (result.visit == "N") {
                currentScope.name(input_scope);
            } else if (result.visit == "A") {
                currentScope.all(input_scope);
            } else if (result.visit == "C") {
                currentScope.care(input_scope);
            } else {
                console.log("Sorry didn't get that, come again?");
                console.log("--------------------------------------------------");
                currentScope.visit();
                currentScope.view(currentScope);
            }
        });
    },
    type: function(input_scope) {
        var currentScope = input_scope;
        console.log("Enter pirate type to check out many those we got.");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'pirate_type'], function(err, result) {
            connection.query('SELECT COUNT(*) FROM pirates WHERE type = ?', [result.pirate_type], function(err, res) {
                if (err) throw err;
                var t = res[0];
                console.log("Okay we got ", t, result.pirate_type);
                console.log("--------------------------------------------------");
                currentScope.visit();
                currentScope.view(currentScope);
            });
        });
    },
    care: function(input_scope) {
        var currentScope = input_scope;
        console.log("Enter city name NY/SF.");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'city_name'], function(err, result) {

            connection.query('SELECT COUNT(*) name FROM pirates RIGHT JOIN pirateCaptains ON pirates.pirateCaptain_id = pirateCaptains.id WHERE pirateCaptains.city = ?', [result.city_name], function(err, res) {
                if (err) throw err;
                console.log("Okay we got ", res);
                console.log("--------------------------------------------------");
                currentScope.visit();
                currentScope.view(currentScope);
            });
        });
    },
    animId: function(input_scope) {
        var currentScope = input_scope;
        console.log("Enter ID of the pirate you want to visit.");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'anim_id'], function(err, result) {
            connection.query('SELECT * FROM pirates WHERE id = ?', [result.anim_id], function(err, res) {
                if (err) throw err;
                console.log("Here is the pirate", res);
                console.log("--------------------------------------------------");
                currentScope.visit();
                currentScope.view(currentScope);
            });
        });
    },
    name: function(input_scope) {
        var currentScope = input_scope;
        console.log("Enter name of the pirate you want to visit.");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'anim_name'], function(err, result) {
            connection.query('SELECT * FROM pirates WHERE name = ?', [result.anim_name], function(err, res) {
                if (err) throw err;
                console.log("Here is the pirate", res);
                console.log("--------------------------------------------------");
                currentScope.visit();
                currentScope.view(currentScope);
            });
        });
    },
    all: function(input_scope) {
        var currentScope = input_scope;

        connection.query('SELECT COUNT(*) FROM pirates', function(err, res) {
            if (err) throw err;
            console.log("Here is the total pirate count", res);
            console.log("--------------------------------------------------");
            currentScope.visit();
            currentScope.view(currentScope);
        });
    },
    update: function(input_scope) {
        var currentScope = input_scope;
        console.log("To update an pirate please enter the ID of the pirate and it's changed information!");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'ID', 'new_name', 'new_age', 'new_type', 'new_pirateCaptain_ID'], function(err, result) {

            connection.query('UPDATE pirates SET name=?,age=?,type=?,pirateCaptain_id=? WHERE id = ?', [result.new_name, result.new_age, result.new_type, result.new_pirateCaptain_ID, result.ID], function(err, result) {
                if (err) throw err;
            });
            console.log("Thank you for updating this pirate, would you like to do something else today?");
            console.log("--------------------------------------------------");

            currentScope.menu();
            currentScope.promptUser();
        });
    },
    adopt: function(input_scope) {
        var currentScope = input_scope;
        console.log("To enlist an pirate please enter the ID of the pirate!");
        console.log("--------------------------------------------------");
        prompt.get(['--->', 'pirate_ID'], function(err, result) {

            connection.query('DELETE FROM pirates WHERE id=?', [result.pirate_ID], function(err, result) {
                if (err) throw err;
            });
            console.log("Thank you for enlisting this pirate, would you like to do something else today?");
            console.log("--------------------------------------------------");

            currentScope.menu();
            currentScope.promptUser();
        });
    },
    promptUser: function() {

        var self = this;

        prompt.get('input', function(err, result) {

            if (result.input == 'C') {

                connection.query('SELECT COUNT(*) FROM pirates', function(err, result) {
                    console.log(result);
                    if (err) throw err;
                    self.promptUser();
                });
            } else if (result.input == 'exit') {
                self.exit();
            } else if (result.input == 'add') {
                self.add(self);
            } else if (result.input == 'update') {
                self.update(self);
            } else if (result.input == 'visit') {
                self.visit();
                self.view(self);
            } else if (result.input == 'recruit') {
                self.adopt(self);
            } else {
                console.log("Sorry didn't get that, come again?");
                self.promptUser();
            };
        });
    },
    exit: function() {
        console.log("Thank you for visiting, BE GONE AND SET SAIL ARGG !");
        process.exit();
    },
    open: function() {

            this.welcome();
            this.menu();
            this.promptUser();
        }
        //ship obj
};

ship.open();
