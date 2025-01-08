// How does spending differ between genders across product categories?

fetch('/get-gender-vs-avg-purchase')
    .then(response => response.json())
    .then(data => {
        const chartData = data.map(item => ({
            gender: item.Gender,
            category1: item.Category1,
            category2: item.Category2,
            category3: item.Category3
        }));

        am5.ready(function () {
            const root = am5.Root.new("chart-gender-avg");
            root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

            const chart = root.container.children.push(am5xy.XYChart.new(root, { layout: root.verticalLayout }));

            const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "gender",
                renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
                tooltip: am5.Tooltip.new(root, {})
            }));

            const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { renderer: am5xy.AxisRendererY.new(root, {}) }));

            function createSeries(field, name) {
                const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    categoryXField: "gender",
                    tooltip: am5.Tooltip.new(root, { labelText: "{name}: {valueY}" })
                }));

                series.columns.template.setAll({
                    tooltipText: "{name}: {valueY}",
                    width: am5.percent(40),
                    tooltipY: 0,
                    cornerRadiusTL: 5,
                    cornerRadiusTR: 5
                });

                series.data.setAll(chartData);
            }

            createSeries("category1", "Category 1");
            createSeries("category2", "Category 2");
            createSeries("category3", "Category 3");

            xAxis.data.setAll(chartData);
            chart.appear(1000, 100);
        });
    });
