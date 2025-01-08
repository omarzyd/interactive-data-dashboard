fetch('/get-purchase-by-age-group')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            age: item.Age,
            total: item.TotalPurchase
        }));

        am5.ready(function () {
            const root = am5.Root.new("chart-age-group");
            root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

            // Create chart
            const chart = root.container.children.push(am5xy.XYChart.new(root, {
                layout: root.verticalLayout
            }));

            // Add a legend
            const legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                y: am5.percent(10)
            }));

            // Create X and Y axes
            const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "age",
                renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
                tooltip: am5.Tooltip.new(root, { labelText: "{category}" })
            }));

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));

            // Create series
            const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Total Purchase",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "total",
                categoryXField: "age",
                tooltip: am5.Tooltip.new(root, {
                    labelText: "Age: {categoryX}\nTotal: {valueY}"
                })
            }));

            series.columns.template.set("tooltipText", "Click to explore more details for {categoryX}");
            series.columns.template.events.on("click", function (ev) {
                const clickedData = ev.target.dataItem.dataContext;
                alert(`Fetching more details for Age Group: ${clickedData.age}`);
                // Implement drill-down logic here
                fetch(`/get-more-details/${clickedData.age}`)
                    .then(response => response.json())
                    .then(details => {
                        // Process the additional data and maybe show in a new chart or a modal
                        console.log(details);
                    });
            });

            // Add hover effects
            series.columns.template.states.create("hover", {
                fill: am5.color("#07527e") // Highlight on hover
            });

            // Set data
            xAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            // Zoom functionality
            chart.set("zoomX", true);
            chart.set("zoomY", true);

            // Enable user to zoom in/out via mouse
            chart.zoomOutButton.set("visible", true); // Show zoom-out button
            chart.zoomInButton.set("visible", true);  // Show zoom-in button

            // Add exporting functionality
            const exporting = am5plugins.Exporting.new(root, {
                menu: am5plugins.ExportingMenu.new(root, {
                    items: [
                        { label: "Export Chart", action: "exportChart" },
                        { label: "Export Data", action: "exportData" }
                    ]
                })
            });

            // Animations
            chart.appear(1000, 100);

        });
    });
