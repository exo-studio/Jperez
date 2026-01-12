
export const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Jhon Carlos Pérez Cubas
N:Pérez Cubas;Jhon Carlos;;;
TITLE:Gerente Comercial - Perú
ORG:Foton International Trade Co., Ltd.
TEL;TYPE=CELL:+51937375605
EMAIL:jhoncarlosperezcubas@gmail.com
EMAIL;TYPE=WORK:jhonperez@foton.com.cn
URL:https://www.fotonmotor.com
ADR;TYPE=WORK:;;Av. Guardia Civil 1321, Int. 802;Surquillo;Lima;;Perú
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jhon_Carlos_Perez_Cubas.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
