anychart.onDocumentReady(function () {

    // create a chart
    var chartContasAtivas = anychart.bar();

    // create a bar series and set the data
    var series = chartContasAtivas.bar(dataContasAtivas);


    // set the titles of the axes
    chartContasAtivas.xAxis().title("Famílias/Alianças");
    chartContasAtivas.yAxis().title("Quantidade de contas ativas");

    // set the container id
    chartContasAtivas.container("contasAtivasPorFamilia");

    // initiate drawing the chart
    chartContasAtivas.draw();

    /*                      */

    // create pie chart with passed data
    var chartPgtoAnual = anychart.pie(vetPgtoAnual);

    // set chart title text settings
    chartPgtoAnual.innerRadius('40%');

    // set chart labels position to outside
    chartPgtoAnual.labels().position('outside');

    // set container id for the chart
    chartPgtoAnual.container('lucroPorFamilia');
    // initiate chart drawing
    chartPgtoAnual.draw();

    /*                      */

    // create pie chart with passed data
    var chartDividaAnual = anychart.pie(vetDividaAnual);

    // set chart title text settings
    chartDividaAnual.innerRadius('40%');

    // set chart labels position to outside
    chartDividaAnual.labels().position('outside');

    // set container id for the chart
    chartDividaAnual.container('dividaPorFamilia');
    // initiate chart drawing
    chartDividaAnual.draw();

    /*                      */

    // create a chart
    var chartRendaLiquidaMaiores = anychart.bar();

    // create a bar series and set the data
    var series = chartRendaLiquidaMaiores.bar(dataRendaAnualMaiores);


    // set the titles of the axes
    chartRendaLiquidaMaiores.xAxis().title("Famílias/Alianças");
    chartRendaLiquidaMaiores.yAxis().title("Medida monetária");

    // set the container id
    chartRendaLiquidaMaiores.container("rendaAnualPorFamiliaMaiores");

    // initiate drawing the chart
    chartRendaLiquidaMaiores.draw();

     /*                      */

    // create a chart
    var chartRendaLiquidaMenores = anychart.bar();

    // create a bar series and set the data
    var series = chartRendaLiquidaMenores.bar(dataRendaAnualMenores);


    // set the titles of the axes
    chartRendaLiquidaMenores.xAxis().title("Famílias/Alianças");
    chartRendaLiquidaMenores.yAxis().title("Medida monetária");

    // set the container id
    chartRendaLiquidaMenores.container("rendaAnualPorFamiliaMenores");

    // initiate drawing the chart
    chartRendaLiquidaMenores.draw();
});