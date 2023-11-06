var Print = require("../models/Print");
const PdfPrinter = require("pdfmake");

class PrintController {
    // REPORT LIST USERS
    async printUsers(req, res) {
        try {
            var user = await Print.reportUsers();
            const tableBody = user.map(user => [user.id, user.name, user.email]);

            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };
            var printer = new PdfPrinter(fonts);

            const docDefinitions = {
                content: [
                    {
                        text: 'Relatório de Usuários\n\n',
                        style: 'header',
                    },
                    {	 
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [{text: 'ID', style: 'tableHeader', alignment: 'center',bold:true}, 
                                {text: 'Name', style: 'tableHeader', alignment: 'center',bold:true},
                                 {text: 'Email', style: 'tableHeader', alignment: 'center',bold:true}],
					
				
                                ...tableBody
                            ],
                        },
                        
                    }
                ],
                defaultStyle: { font: 'Helvetica' },
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment:  'center'
                    },                       
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=Relatorio.pdf');

            pdfDoc.pipe(res); // Envia o PDF como resposta para o cliente
            pdfDoc.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao gerar o relatório PDF');
        }
    }
    // REPORT PRINT LIST CLIENTES
    async printClients(req, res) {
        try {
            var user = await Print.reportClients();
            const tableBody = user.map(user =>  [user.idcli, user.nomecli, user.endcli, user.foneclie, user.emailcli]);
          
            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };
            var printer = new PdfPrinter(fonts);

            const docDefinitions = {
                content: [
                    {
                        text: 'Relatório de Clientes\n\n',
                        style: 'header',
                    },
                    {
                        table: {
                            widths: ['*', '*', '*', '*', '*'],
                            body: [
                                [{text: 'ID', style: 'tableHeader', alignment: 'center',bold:true}, 
                                {text: 'Nome', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Endereço', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Fone', style: 'tableHeader', alignment: 'center',bold:true},
                                 {text: 'Email', style: 'tableHeader', alignment: 'center',bold:true}],
					
				
                                ...tableBody
                            ],
                        
                        },
                    }
                ],
                defaultStyle: { font: 'Helvetica' },
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment:  'center'
                    },                       
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=Relatorio.pdf');

            pdfDoc.pipe(res); // Envia o PDF como resposta para o cliente
            pdfDoc.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao gerar o relatório PDF');
        }
    }
    // REPORT CREATE A OS
    async printOs(req, res) {
        try {
            var os = req.params.os;
        var user = await Print.reportOs(os);
            function formatDate(date) {
                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                return new Date(date).toLocaleDateString(undefined, options);
             }
            const tableBody = user.map(user => [user.os,  formatDate(user.data_os), user.equipamento, user.defeito, user.servico, user.tecnico, user.valor, user.idcli_os, user.tipo, user.situacao]);
            
            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };
            var printer = new PdfPrinter(fonts);

            const docDefinitions = {
                content: [
                    {
                        text: 'Relatório de Ordens de Serviços\n\n',
                        style: 'header',
                    },
                    {	 
                        table: {
                            widths: ['*', '*', '*','*', '*', '*','*', '*', '*','*','*','*'],
                            body: [
                                [{text: 'Os', style: 'tableHeader', alignment: 'center',bold:true}, 
                                {text: 'Data', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Equipamento', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Defeito', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Servico', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Técnico', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Valor', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Idcli', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Tipo', style: 'tableHeader', alignment: 'center',bold:true},                            
                                {text: 'Situação', style: 'tableHeader', alignment: 'center',bold:true}],
					
				
                                ...tableBody
                            ],
                        },
                        
                    }
                ],
                defaultStyle: { font: 'Helvetica' },
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment:  'center'
                    },                       
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=Relatorio.pdf');

            pdfDoc.pipe(res); // Envia o PDF como resposta para o cliente
            pdfDoc.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao gerar o relatório PDF');
        }
    }
    // REPORT PRINT ALL OS
    async printAllOs(req, res) {
        try {
        var user = await Print.reportAllOs();
            function formatDate(date) {
                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                return new Date(date).toLocaleDateString(undefined, options);
             }
            const tableBody = user.map(user => [user.os,  formatDate(user.data_os), user.equipamento, user.defeito, user.servico, user.tecnico, user.valor, user.idcli_os, user.tipo, user.situacao]);
            
            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            };
            var printer = new PdfPrinter(fonts);

            const docDefinitions = {
                content: [
                    {
                        text: 'Relatório de Ordens de Serviço\n\n',
                        style: 'header',
                    },
                    {	 
                        table: {
                            widths: ['*', '*', '*','*', '*', '*','*', '*', '*','*','*','*'],
                            body: [
                                [{text: 'Os', style: 'tableHeader', alignment: 'center',bold:true}, 
                                {text: 'Data', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Equipamento', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Defeito', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Servico', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Técnico', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Valor', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Idcli', style: 'tableHeader', alignment: 'center',bold:true},
                                {text: 'Tipo', style: 'tableHeader', alignment: 'center',bold:true},                            
                                {text: 'Situação', style: 'tableHeader', alignment: 'center',bold:true}],
					
				
                                ...tableBody
                            ],
                        },
                        
                    }
                ],
                defaultStyle: { font: 'Helvetica' },
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        alignment:  'center'
                    },                       
                }
            };

            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=Relatorio.pdf');

            pdfDoc.pipe(res); // Envia o PDF como resposta para o cliente
            pdfDoc.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao gerar o relatório PDF');
        }
    }
}

module.exports = new PrintController();
