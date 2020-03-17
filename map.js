"use strict";

function flowMapSource(){
  var width = 1000,
      height = 600;


  var svg = d3.select("body")
            .append("svg");

            // .style("width", 1200)
            // .style("height", 600);

  var projection = d3.geoNaturalEarth1()
      .scale(210)
      .translate([width/2.05, height/1.8]);

//   const zoom = d3.zoom()
//                       .scaleExtent([1,6])
//                       .on("zoom", zoomed);

  const g = svg.append('g');
//   svg.call(zoom);

// Adding text in the svg canvas
        //   svg.append("text")
        //     .attr("x", 10)
        //     .attr("y", 400)
        //     .attr("class", "text")
        //     .text("Corona Migration Map")
        //     .style("font-size",28)
        //     .style("font-weight","bold")
        // // Adding text in the svg canvas

        //   svg.append("text")
        //     .attr("x", 10)
        //     .attr("y", 430)
        //     .attr("class", "text")
        //     .text("Hover the mouse over the lines for \n interactivity")
        //     .style("font-size",22)
        //     .style("font-weight","bold")


      // Draw the map
      // NOTE: Remove Antarctica from the data source
    var countries = svg.append("g")
        .selectAll("path")
        .data(world.features)
        .enter().append("path")
            .filter(function(d){ return d.properties.name !== "Antarctica"})
            .attr("class","world")
            .attr("fill", "#404040")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#ffffff")
            .style("stroke-width","0.5");

      // Draw the lines
      // NOTE: Remove "case_from == China" from the data source
      // svg.append("g")
      //     .selectAll("path")
      //     .data(con.features)
      //     .enter().append("path")
      //         .attr("stroke", "#ff0066")
      //         .attr("class", "paths")
      //         .attr("d", d3.geoPath()
      //             .projection(projection)
      //         )
      // // Adding interactivity
      //         .on("mouseover", function(d,i){
      //           d3.select(this)
      //             .attr("stroke-width", 5)
      //             .attr("stroke", "cyan")
      //         })
      //         .on("mouseout", function(){
      //           d3.select(this)
      //             .attr("stroke-width", 0.5)
      //             .attr("stroke", "#ff0066")
      //         });

            var x1 = con2.features[0].geometry.coordinates[0][0][0];
            var y1 = con.features[104].geometry.coordinates[0][0][1];
            var x2 = con.features[104].geometry.coordinates[0][1][0];
            var y2 = con.features[104].geometry.coordinates[0][1][1];



            // console.log(x1);
            // // console.log(y1);
            // console.log(x2);
            // console.log(y2);


            var test1 = [x1,y1],
                test2 = [x2,y2];
            //     test3 = [test1,test2];
            // console.log(projection([x1,y1]));
            // console.log(projection(test2));


          //   svg.append("g")
          // .selectAll("line")
          // .data([x1,y1,])
          // .enter().append("line")

          //     .attr("x1", function (d) { /*console.log(projection(d)[0]);*/ return projection(d)[0]; })

          //     .attr("y1", function (d) { console.log(projection(d)[1]); return projection(d)[0]; })

          //     .attr("x2", function (d) { /*console.log(projection(d)[0]);*/ return projection(d)[0]; })

          //     .attr("y2", function (d) { /*console.log(projection(d)[1]);*/ return projection(d)[1]; })

          //     .attr("class", "line")


          var xy1 = projection(test1);
          var xy2 = projection(test2);
          // // console.log(xy1[0]);

          //     svg.append("g")
          //         .selectAll("line")
          //         .data([xy1,xy2])
          //         .enter().append("line")

          //             .attr("x1", xy1[0])

          //             .attr("y1", xy1[1])

          //             .attr("x2", xy2[0])

          //             .attr("y2", xy2[1])

          //             .attr("class", "line")


          var lines =   svg.append("g")
                  .selectAll("line")
                  .data(con2.features)
                  .enter().append("line")
                  .filter(function(d){ return d.properties.case_from !== "China";})

                      .attr("x1", function(d){
                        return projection(d.geometry.coordinates[0][0])[0];
                      })

                      .attr("y1", function(d){
                        return projection(d.geometry.coordinates[0][0])[1];
                      })

                      .attr("x2",  function(d){
                        return projection(d.geometry.coordinates[0][1])[0];
                      })

                      .attr("y2",  function(d){
                        return projection(d.geometry.coordinates[0][1])[1];
                      })

                      .attr("class", "line")

            // console.log(con.features[0].geometry.coordinates[0][1][1])

            // console.log(projection(x1))



            // svg.selectAll("circle")
            //             .data([test1,test2]).enter()
            //             .append("circle")
            //             .attr("cx", function (d) { console.log(projection(d)[0]); return projection(d)[0]; })
            //             .attr("cy", function (d) { console.log(projection(d)[1]); return projection(d)[1]; })
            //             .attr("r", "8px")
            //             .attr("fill", "red")

            var sources = svg.selectAll("circle")
                        .data(con2.features).enter()
                        .append("circle")

                              .attr("class", "source")
                              .filter(function(d){ return d.properties.case_from !== "China";})
                        // .filter(function(d){ return d.properties.case_from !== "China"})
                              .attr("cx", function(d){
                        return projection(d.geometry.coordinates[0][0])[0];
                    })
                              .attr("cy", function(d){
                        return projection(d.geometry.coordinates[0][0])[1];
                      })
                              .attr("r", "4.25px")
                              
                              
                              // .attr("fill", "red")


//           function zoomed(){
//               svg
//         .selectAll(".world,.line, .source") // To prevent stroke width from scaling
//         // .select('line')
//         .attr('transform', d3.event.transform);

//           }

          countries
                .on("mouseover", function (d){ d3.select(this).append("title") .text(function(d){ return d.properties.name})})

          sources

                .on("mouseover", function(d){

                  sources.style("fill","none").style("stroke","none")
                  d3.select(this).style("fill","#ff0080").style("stroke","white")
                  .append("title") .text(function(d){ return d.properties.case_from}).style("font-size",30)

                  lines
                      .style("stroke", function (case_from){ return case_from.properties.case_from === d.properties.case_from ? '#ff0080' : '#none';})
                      .style("stroke-width", function (case_from){ return case_from.properties.case_from === d.properties.case_from ? 2 : 0;})
                })

                .on('mouseout', function (d) {
                        sources.style('fill', "#00ff99").style("stroke","white")
                        lines
                          .style('stroke', 'none')
                          .style('stroke-width', '1')
                      })





            // console.log(y1)
            // console.log(x2)
            // console.log(y2)

              // .attr("d", d3.path()
              //     .projection(projection)
              // )
      // Adding interactivity
              // .on("mouseover", function(d,i){
              //   d3.select(this)
              //     .attr("stroke-width", 5)
              //     .attr("stroke", "cyan")
              // })
              // .on("mouseout", function(){
              //   d3.select(this)
              //     .attr("stroke-width", 0.5)
              //     .attr("stroke", "#ff0066")
              // });


};


///////////// Another Map for the Destination Interactivity /////////////////////////////

function flowMapDestination(){
  var width = 1000,
      height = 600;


  var svg = d3.select("body")
            .append("svg")
            .attr("class", "destination")

  var projection = d3.geoNaturalEarth1()
      .scale(210)
      .translate([width/2.05, height/1.8]);

  // Setting the zoom interactivity
//   const zoom = d3.zoom()
//                       .scaleExtent([1,6])
//                       .on("zoom", zoomed);

  const g = svg.append('g');
//   svg.call(zoom);

      // Draw the map
    var countries = svg.append("g")
        .selectAll("path")
        .data(world.features)
        .enter().append("path")
            .filter(function(d){ return d.properties.name !== "Antarctica"})
            .attr("class","world")
            .attr("fill", "#404040")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#ffffff")
            .style("stroke-width","0.5");


          // Draw the connection lines
          var lines =   svg.append("g")
                  .selectAll("line")
                  .data(con2.features)
                  .enter().append("line")
                  .filter(function(d){ return d.properties.case_to !== "China";})

                      .attr("x1", function(d){
                        return projection(d.geometry.coordinates[0][0])[0];
                      })

                      .attr("y1", function(d){
                        return projection(d.geometry.coordinates[0][0])[1];
                      })

                      .attr("x2",  function(d){
                        return projection(d.geometry.coordinates[0][1])[0];
                      })

                      .attr("y2",  function(d){
                        return projection(d.geometry.coordinates[0][1])[1];
                      })

                      .attr("class", "line")

            // Draw the Destination points

            var destination = svg.selectAll("circle")
                        .data(con2.features).enter()
                        .append("circle")

                              .attr("class", "destination")
                              // .filter(function(d){ return d.properties.case_to !== "China";})
                        // .filter(function(d){ return d.properties.case_from !== "China"})
                              .attr("cx", function(d){
                        return projection(d.geometry.coordinates[0][1])[0];
                    })
                              .attr("cy", function(d){
                        return projection(d.geometry.coordinates[0][1])[1];
                      })
                              .attr("r", "4.25px")
                              

          // Adding the zoom functionality
//           function zoomed(){
//               svg
//         .selectAll(".world,.line, .destination, .text_to") 
//         .attr('transform', d3.event.transform);

//           }

          // Adding the map interactivity
          countries
                .on("mouseover", function (d){ d3.select(this).append("title") .text(function(d){ return d.properties.name})})


          destination

                .on("mouseover", function(d){

                  destination.style("fill","none").style("stroke","none")
                  d3.select(this).style("fill","#ff0080").style("stroke","white")
                  .append("title") .text(function(d){ return d.properties.case_to})

                  lines
                      .style("stroke", function (case_from){ return case_from.properties.case_to === d.properties.case_to ? '#ff0080' : '#none';})
                      .style("stroke-width", function (case_from){ return case_from.properties.case_to === d.properties.case_to ? 2 : 0;})
                })

                .on('mouseout', function (d) {
                        destination.style('fill', "#ffff00").style("stroke","white")
                        lines
                          .style('stroke', 'none')
                          .style('stroke-width', '1')
                      })

};
