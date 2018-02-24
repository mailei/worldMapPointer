var pointdata = {
    "cityName": "Tokyo",
    "data": [139.69170639999993, 35.6894875]
}

var width = 700,
    height = 450;

var svg = d3.select("#worldMap").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

// 地図の投影位置、縮尺
var mercator = d3.geo.mercator()
    .center([0, 35])
    .translate([width / 2, height / 2])
    .scale(100)
    .precision(.1);

console.log(svg)

var path = d3.geo.path()
    .projection(mercator);

// map data https://github.com/topojson/world-atlas
d3.json("world.json", function (error, world) {
    console.log(world);

    // 投影法設定
    // リファレンス：https://github.com/topojson/topojson-client/blob/master/README.md#feature
    var geometries = topojson.feature(world, world.objects.countries);

    svg.selectAll("cauntry")
        .data(geometries.features)
        .enter()
        .append("path")
        .attr("class", function (data) { return data.id; })
        .attr("d", path);
    
    // 点の表示
    // point sample http://shimz.me/example/d3js/geo_example2/line/
    svg.selectAll(".point")
        .data(pointdata.data)
        .enter()
        .append("circle")
        .attr({
            "cx": mercator(pointdata.data)[0],
            "cy": mercator(pointdata.data)[1],
            "r": 10,
            "fill": "red",
            "fill-opacity": 1
        });
        
    //　テキストの表示
    svg.selectAll(".point")
        .data(pointdata.data)
        .enter()
        .append("text")
        .attr({
            "x": mercator(pointdata.data)[0],
            "y": mercator(pointdata.data)[1] - 25,
            "fill": "red",
            "text-anchor": "middle"
        })
        .text(pointdata.cityName);

});

//　画像の場合はこれ参考 https://code.i-harness.com/ja/q/20bbb76
