document.addEventListener("DOMContentLoaded", function() {
    fetch('/get-occupation-vs-purchase')
        .then(response => response.json())
        .then(data => {
            const chartData = data.map(item => ({
                occupation: item.Occupation,
                totalPurchase: item.TotalPurchase
            }));

            am5.ready(function () {
                // Create root
                const root = am5.Root.new("chart-occupation-purchase");
                root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

                // Create XY chart
                const chart = root.container.children.push(am5xy.XYChart.new(root, {
                    layout: root.verticalLayout
                }));

                // Add Y-axis (categories)
                const yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "occupation",
                    renderer: am5xy.AxisRendererY.new(root, {
                        minGridDistance: 20
                    }),
                    tooltip: am5.Tooltip.new(root, { labelText: "{category}" })
                }));

                // Add X-axis (values)
                const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    tooltip: am5.Tooltip.new(root, { labelText: "{value}" })
                }));

                // Add series
                const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Total Purchase",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: "totalPurchase",
                    categoryYField: "occupation",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{categoryY}: {valueX}"
                    })
                }));

                // Add rounded corners and tooltips
                series.columns.template.setAll({
                    cornerRadiusBL: 5,
                    cornerRadiusTL: 5,
                    tooltipText: "{categoryY}: {valueX}"
                });

                // Add value labels
                series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                        sprite: am5.Label.new(root, {
                            text: "{valueX}",
                            populateText: true,
                            centerY: am5.percent(50),
                            centerX: am5.percent(50),
                            fontSize: 12,
                            fill: am5.color(0xffffff)
                        })
                    });
                });

                // Dynamically sort data in descending order (initial sort)
                chartData.sort((a, b) => b.totalPurchase - a.totalPurchase);

                // Function to toggle sort order between ascending and descending
                let isSortedDescending = true;
                const toggleSort = () => {
                    if (isSortedDescending) {
                        chartData.sort((a, b) => a.totalPurchase - b.totalPurchase); // Ascending
                    } else {
                        chartData.sort((a, b) => b.totalPurchase - a.totalPurchase); // Descending
                    }
                    isSortedDescending = !isSortedDescending;
                    yAxis.data.setAll(chartData);
                    series.data.setAll(chartData);
                };

                // Add sorting toggle button
                const sortBtn = document.getElementById("sort-toggle-btn");
                if (sortBtn) {
                    sortBtn.addEventListener("click", toggleSort);
                }

                // Make bars sortable
                setInterval(() => {
                    yAxis.data.setAll(chartData);
                    series.data.setAll(chartData);
                }, 3000);

                // Add zooming functionality
                chart.set("zoomX", true);  // Enables zoom on the X-axis
                chart.set("zoomY", true);  // Enables zoom on the Y-axis

                // Show zoom out and zoom-in buttons
                chart.zoomOutButton.set("visible", true);
                chart.zoomInButton.set("visible", true);

                // Reset zoom button
                const resetZoomBtn = document.getElementById("reset-zoom-btn");
                if (resetZoomBtn) {
                    resetZoomBtn.addEventListener("click", function () {
                        chart.set("zoomX", false);
                        chart.set("zoomY", false);
                    });
                }

                // Add exporting functionality to the chart
                const exporting = am5plugins.Exporting.new(root, {
                    menu: am5plugins.ExportingMenu.new(root, {
                        items: [
                            { label: "Export Chart", action: "exportChart" },
                            { label: "Export Data", action: "exportData" }
                        ]
                    })
                });

                // Animate on load
                chart.appear(1000, 100);

                // Set data
                yAxis.data.setAll(chartData);
                series.data.setAll(chartData);
            });
        });
    });

