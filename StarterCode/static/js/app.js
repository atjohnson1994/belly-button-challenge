
let endPoint = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// create empty arrays to hold data
names = [];
values = [];
sampleValues = [];
otuIds = [];
otuLabels = [];
metadata = [];

// initialize the page and store data from url
d3.json(endPoint).then(function(data) {

    values.push(data['samples']);
    metadata.push(data['metadata'])
    names.push(data['names']);

    fix();
    populateMenu();
    graph();
    bubble();
    demographicInfo(0);
});

// push data into empty arrays
function fix() {
    for (let i=0; i < values[0].length; i++) {

    sampleValues.push(values[0][i]['sample_values']);
    otuIds.push(values[0][i]['otu_ids']);
    otuLabels.push(values[0][i]['otu_labels']);
}}

// populate the drop down menu with test subject IDs
function populateMenu() {

    // select the 'selDataset' element
    select = document.getElementById('selDataset')
    // for each item in the 'names' array, create an option in the selected element
    for (i = 0; i < names[0].length; i++) {
       option = document.createElement( 'option' );
       option.value = i;
       option.text = names[0][i];
       select.add( option ); 
    }
}



// initizlize the graph for first ID
function graph() {
    // convert to string and add 'OTU'
    let stringed = otuIds[0].map((x) => `OTU ${x}`);

    // set data for graph
    let trace1 = {
        x: sampleValues[0].slice(0,10).reverse(),
        y: stringed.slice(0,10).reverse(),
        text: otuLabels[0],
        type: 'bar',
        orientation: 'h'
    };
    let layout = {
        xaxis: {
            title: 'Sample Values',
            titlefont: 'Old Standard TT, serif',
            size: 24,
            color: 'grey'
        },
        yaxis: {
            title: 'OTU ID',
            titlefont: 'Old Standard TT, serif',
            size: 24,
            color: 'grey'
        },
        height: 400,
        width: 800
    }
    // plot graph
    let data = [trace1];
    Plotly.newPlot('bar', data, layout);
}




// listen for drop down menu 'change' event
function optionChanged(newData) {
    // when event occurs, send new data to graphs and demographic info
    regraph(newData);
    regraphbubble(newData);
    demographicInfo(newData);
}


// change plotly graph to new subject id
function regraph(newData) {

    let data = [];
    let stringed = [];
    let trace1 = {};
    // convert to string and add 'OTU'
    stringed = otuIds[newData].map((x) => `OTU ${x}`);

    // set data for graph
    trace1 = {
        x: sampleValues[newData].slice(0,10).reverse(),
        y: stringed.slice(0,10).reverse(),
        text: otuLabels[newData],
        type: 'bar',
        orientation: 'h'
    };
    // plot graph
    data = [trace1];
    console.log(data[0]['x'])
    Plotly.restyle('bar', 'x', [data[0]['x']]);
    Plotly.restyle('bar', 'y', [data[0]['y']]);
}




// initialize bubble graph
function bubble() {
    let trace2 = {
        x: otuIds[0],
        y: sampleValues[0],
        mode: 'markers',
        text: otuLabels[0][0],
        marker: {
            size: sampleValues[0],
            color: otuIds[0]
        }
    };
    let layout = {
        height: 600,
        width: 1200,
        yaxis: {
            title: 'Sample Values',
            titlefont: {
                family: 'Old Standard TT, serif',
                size: 24,
                color: 'grey'
            }
        },
        xaxis: {
            title: 'OTU ID',
            titlefont: {
                family: 'Old Standard TT, serif',
                size: 24,
                color: 'grey'
            }}
    }
    data = [trace2]
    Plotly.newPlot('bubble', data, layout)
}

// regraph bubble on selection
function regraphbubble(newData) {

    let data = [];
    let trace2 = {};

    // set data for graph
    trace2 = {
        x: otuIds[newData],
        y: sampleValues[newData],
        mode: 'markers',
        text: otuLabels[newData],
        marker: {
            size: sampleValues[newData],
            color: otuIds[newData]
        }
    };

    // plot graph
    data = [trace2];

    Plotly.restyle('bubble', 'x', [data[0]['x']]);
    Plotly.restyle('bubble', 'y', [data[0]['y']]);
    Plotly.restyle('bubble', 'marker', [data[0]['marker']]);
}


// populate the demographic information
function demographicInfo(newData) {
    var id = document.getElementById('id');
    id.textContent = `ID: ${metadata[0][newData]['id']}`;

    var ethnicity = document.getElementById('ethnicity');
    ethnicity.textContent = `Ethnicity: ${metadata[0][newData]['ethnicity']}`;

    var gender = document.getElementById('gender');
    gender.textContent = `Gender: ${metadata[0][newData]['gender']}`;

    var age = document.getElementById('age');
    age.textContent = `Age: ${metadata[0][newData]['age']}`;

    var location = document.getElementById('location');
    location.textContent = `Location: ${metadata[0][newData]['location']}`;

    var bbtype = document.getElementById('bbtype');
    bbtype.textContent = `Bbtype: ${metadata[0][newData]['bbtype']}`;

    var wfreq = document.getElementById('wfreq');
    wfreq.textContent = `Wfreq: ${metadata[0][newData]['wfreq']}`;


  
}