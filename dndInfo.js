document.getElementById('woo').addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  let name = document.getElementById('input').value;
  let s = document.getElementById('selector');
  let category = s.options[s.selectedIndex].value

  if (input === "") {
    text: "Please type the name of what you are trying to find";
  }

  let url = "https://www.dnd5eapi.co/api/" + category + "/" + name + "?json";
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the D&D API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      let textContent = "";
      if(category == "classes") {
        textContent += '<h2>' + json.name + '</h2>';
        textContent += '<h3>Hit Dice: ' + json.hit_die + '</h3>';
        /*textContent += '<h4>Possible Proficiencies: Choose ' + json.proficiency_choices.choose + '</h4>';
        textContent += '<ul>'
        for (let i = 0; i < json.from.length; i++) {
          textContent += '<li>' + json.from[i].name + '</li>';
        }
        textContent += '</ul>';*/
        textContent += '<h5>Regular Proficiencies</h5>';
        textContent += '<ul>';
        for (let i=0; i < json.proficiencies.length; i++) {
          textContent += '<li>' + json.proficiencies[i].name + '</li>';
        }
        textContent += '</ul>';
        textContent += '<h6>Saving Throws</h6>';
        textContent += '<ul>';
        for (let i = 0; i < json.saving_throws.length; i++) {
          textContent += '<li>' + json.saving_throws[i].name + '</li>';
        }
        textContent += '</ul>';
        textContent += '<p>Sublasses Available in Starter Kit: ';
        for (let i = 0; i < json.subclasses.length; i++) {
          if(i > 0) {
            textContent += ' ,';
          }
          textContent += json.subclasses[i].name;
        }
        textContent += '</p>';
      } else if (category == "monsters") {
        textContent += '<h2>' + json.name + '<h2>';
        textContent += '<h3>Health: ' + json.hit_points + '</h3>';
        textContent += '<h4>AC: ' + json.armor_class + '</h4>';
        textContent += '<p>Challange Rating: ' + json.challenge_rating + '</p>';
        textContent += '<h5>Stats:</h5>';
        textContent += '<p>STR: ' + json.strength + ', DEX: ' + json.dexterity + ', CON: '
          + json.constitution + ', INT: ' + json.intelligence + ', WIS: ' + json.wisdom +
          ', CHA: ' + json.charisma + '</p>';
        textContent += '<p>Size: ' + json.size + '</p>';
        textContent += '<p>Type: ' + json.type + '</p>';
        textContent += '<p>Alignment: ' + json.alignment + '</p>';
        if(json.damage_vulnerabilities.length > 0) {
          textContent += '<p>Damage Vulnerabilities</p>';
          textContent += '<ul>';
          for(let i = 0; i < json.damage_vulnerabilities.length; i++) {
            textContent += '<li>' + json.damage_vulnerabilities[i] + '</li>';
          }
          textContent += '</ul>';
        }
        if(json.damage_resistances.length > 0) {
          textContent += '<p>Damage Resistances</p>';
          textContent += '<ul>';
          for(let i = 0; i < json.damage_resistances.length; i++) {
            textContent += '<li>' + json.damage_resistances[i] + '</li>';
          }
          textContent += '</ul>';
        }
        if(json.damage_immunities.length > 0) {
          textContent += '<p>Damage Immunitites</p>';
          textContent += '<ul>';
          for(let i = 0; i < json.damage_immunities.length; i++) {
            textContent += '<li>' + json.damage_immunities[i] + '</li>';
          }
          textContent += '</ul>';
        }
      } else if (category == "spells") {
        textContent += '<h2>' + json.name + '</h2>';
        textContent += '<p>Range: ' + json.range + '</p>';
        textContent += '<p>Level: ' + json.level + '</p>';
        textContent += '<p>Duration: ' + json.duration + '</p>';
        textContent += '<p>Casting Time: ' + json.casting_time + '</p>';
        textContent += '<p>Concetration: ' + json.concentration + '</p>';
        textContent += '<p>' + json.desc + '</p>';
        textContent += '<p>' + json.higher_level + '</p>';
        textContent += '<h3>Components</h3>';
        textContent += '<ul>';
        for (let i = 0; i < json.components.length; i++) {
          textContent += '<li>' + json.components[i] + '</li>';
        }
        textContent += '</ul>';
      };
      updateResult(textContent)
    });
}

function updateResult(info) {
  document.getElementById('result').innerHTML = info;
}
