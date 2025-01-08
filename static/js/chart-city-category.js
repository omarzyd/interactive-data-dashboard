// What percentage of customers are from each city category?

fetch('/get-city-category-distribution')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch data from the server.");
        }
        return response.json();
    })
    .then(data => {
        // Transform the data into chart-compatible format
        const chartData = data.map(item => ({
            city: item.City_Category,
            count: item.UserCount
        }));

        // Initialize the chart
        am5.ready(function () {
            // Create root element
            const root = am5.Root.new("chart-city-category");

            // Set themes
            root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

            // Create a Pie Chart
            const chart = root.container.children.push(am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            }));

            // Add Pie Series
            const series = chart.series.push(am5percent.PieSeries.new(root, {
                valueField: "count",
                categoryField: "city",
                tooltip: am5.Tooltip.new(root, { labelText: "{category}: {value} ({value.percent.formatNumber('#.0')}%)" })
            }));

            // Add hover and active state styles
            series.slices.template.states.create("hover", {
                scale: 1.1,
                fill: am5.color("#07527e")
            });

            series.slices.template.states.create("active", {
                shiftRadius: 20
            });

            // Add legend for better clarity
            const legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.percent(50),
                x: am5.percent(50),
                y: am5.percent(10),
                layout: root.verticalLayout
            }));

            legend.data.setAll(series.dataItems);

            // Set data for the series
            series.data.setAll(chartData);

            // Animate the chart on load
            chart.appear(1000, 100);
        });
    })
    .catch(error => {
        console.error("Error fetching or processing data:", error);
        alert("Unable to load the chart. Please try again later.");
    });
