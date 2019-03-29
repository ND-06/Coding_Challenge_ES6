/////////////////////////////////
// CODING CHALLENGE
/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. 
All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, 
default parameters, maps, arrow functions, destructuring, etc.
*/

class ParadiseCity {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Parks extends ParadiseCity {
  constructor(name, buildYear, numOfTrees, area) {
    super(name, buildYear);
    this.numOfTrees = numOfTrees;
    this.area = area;
  }
  calculateTreeDensity() {
    const treeDensity = this.numOfTrees / this.area; // area in km2.
    console.log (`${this.name} has a tree density of ${treeDensity} trees per square km.`); 
  }
}

class Streets extends ParadiseCity {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }
  streetClassification() {
    const streetSizeCategory = new Map();
    streetSizeCategory.set(1,'Tiny');
    streetSizeCategory.set(2,'Small');
    streetSizeCategory.set(3, 'Normal');
    streetSizeCategory.set(4, 'Big');
    streetSizeCategory.set(5, 'Huge');
    console.log(`${this.name}, build in ${this.buildYear}, is a ${streetSizeCategory.get(this.size)} street.`);
  }
}

const allParks = [
  new Parks('Madison Square Park', 1847, 300, 0.024), 
  new Parks('Millennium Park', 2004, 9000, 0.105), 
  new Parks('Central Park', 1857, 100, 3.41)
];

const allStreets = [
  new Streets('React Avenue', 1938, 1.7, 4),
  new Streets('Nodejs Street', 1942, 2.4, 5),
  new Streets('JavaScript Boulevard', 1979, 2.9, 5),
  new Streets('MongoDb Road', 1950, 1, 2)
];

function reportParks(p) {

  // Display properly  title of our Parks Report
  console.log(`********** Parks Report **********`);
  // Calculate and display the TreeDensity of each park in our town 
  p.forEach(park => park.calculateTreeDensity());
  
  // Calculate and display the average age of ours parks and 
  // return the name of parks which contains more than 1000 trees
  let result = [];
  let thousandTrees = "";

  p.forEach(function(element) {
    result.push(new Date().getFullYear() - element.buildYear);
      if (element.numOfTrees > 1000) {
        console.log(`${element.name} has more than 1000 trees.`);
      }  
  });
  
  let sum = result.reduce((accumulator, currentValue) => accumulator + currentValue);
  const avgAge = sum / result.length;
  console.log(`Our parks have an average age of ${avgAge} years.`);
}

function reportStreets(s) { 
  
  // Display properly  title of our Parks Report
  console.log(`********** Streets Report **********`);
  // Calculate and display the total length of ours streets  
  let sum = [];
  let avgLength = 0;

  s.forEach(function(element) {
    sum.push(element.length);
    avgLength += element.length;
  });
  let streetsAverageLength = avgLength / sum.length; 
  let streetsTotalLength = sum.reduce((accumulator, currentValue) => accumulator + currentValue);
  streetsAverageLength = streetsTotalLength / 3;
  console.log(`Ours ${sum.length} streets have a total length of ${streetsTotalLength} kilometers and each street have an average length of ${streetsAverageLength} km.`);  
  
  // Display the size classification for each street.
  s.forEach(street => street.streetClassification());
}

reportParks(allParks);
reportStreets(allStreets);
