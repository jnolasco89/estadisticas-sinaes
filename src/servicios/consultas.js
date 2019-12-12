import Axios from 'axios'
import DepMun from './DepMun'

export default class Consultas {
    getParametrosURL() {
        let idFuente = 1,
            idTema = 101,
            anioIni = (new Date()).getYear(),
            anioFin = (new Date()).getFullYear(),
            dep = 1,
            mun = 101;

        if (document.URL.indexOf("?") > 0) {
            idFuente = document.URL.substr(document.URL.indexOf("?") + 1)
                .split("&")[1]
                .replace("ft=", "");
            idTema = document.URL.substr(document.URL.indexOf("?") + 1)
                .split("&")[2]
                .replace("tm=", "");
            anioIni = document.URL.substr(document.URL.indexOf("?") + 1)
                .split("&")[3]
                .replace("ai=", "");
            /*
          anioFin = document.URL.substr(document.URL.indexOf("?") + 1)
            .split("&")[4]
            .replace("af=", "");*/
            dep = document.URL.substr(document.URL.indexOf("?") + 1)
                .split("&")[5]
                .replace("dp=", "");
            mun = document.URL.substr(document.URL.indexOf("?") + 1)
                .split("&")[6]
                .replace("mu=", "");
        }

        return {
            idFuente: idFuente,
            idTema: idTema,
            anioIni: anioIni,
            anioFin: anioFin,
            idDepto: dep,
            idMun: mun
        };
    }

    getFuentes() {
        return [
            { id: -1, nombre: "Fuente" },
            { id: 1, nombre: "CONNA" },
            { id: 2, nombre: "MINED" },
            { id: 3, nombre: "IML" },
            { id: 5, nombre: "FGR" }
        ];
    }

    getTemasYsubtemasFuente(idFuente) {
        var consulta = async () => {
            let res = await Axios.get('http://localhost:33251/api/ws/temas/' + idFuente);
            return res;
        }

        return consulta;
    }

    getDatosFuente(idFuente, anioIni, anioFin, idDepto, idMun, temaId, cantSubtemas){
        //1, 2015, 2019, '-1', '-1', 102
        var consulta = async () => {
            let res = await Axios.get('http://localhost:33251/api/ws/datosfuente/'+idFuente+'/'+anioIni+'/'+anioFin+'/'+idDepto+'/'+idMun+'/'+temaId+'/'+cantSubtemas);
            return res;
        }

        return consulta;
    }

    getDepartamentos() {
        let deptos = [{
            DepartamentoID: -1 * 1,
            DepartamentoLbl: "Nivel Nacional"
        }];
        DepMun.Departamento.forEach(depto => {
            if (depto.DEP_ID * 1 > 0) {
                depto.DepartamentoID = depto.DepartamentoID * 1;
                deptos.push(depto);
            }
        });
        return deptos;
    }

    getNombreZona(id,nivelGeografico){
        var nombre="";

        if(nivelGeografico==1){
            DepMun.Departamento.forEach(depto => {
                if (depto.DEP_ID * 1 == id) {
                    nombre=depto.DepartamentoLbl;
                }
            });
        }else{
            DepMun.Municipio.forEach(mun => {
                if (depto.MUN_ID * 1 == id) {
                    nombre=mun.MunicipioLbl;
                }
            });
        }
       
        return nombre;
    }

    getMunicipios(idDepto) {
        let municipios = [
            {
                MUN_ID: -1 * 1,
                MunicipioLbl: "Seleccione un departamento"
            }
        ];

        if (idDepto * 1 > 0) {
            DepMun.Municipio.forEach(mun => {
                if (mun.DEP_ID * 1 == idDepto * 1 && mun.MUN_ID * 1 > 0) {
                    mun.MUN_ID = mun.MUN_ID * 1;
                    municipios.push(mun);
                }
            });
        }

        return municipios;
    }

    getDataDonut() {
        let data = {
            chartdata: {
                labels: ['niños', 'niñas '],
                datasets: [
                    {
                        backgroundColor: ["blue", "red"],
                        data: [1, 4]
                    }
                ]
            },
            options: {
                tooltips: {
                    enabled: true,
                    bodyFontSize: 40
                },
                legend: {
                    display: false,
                },
                title: {
                    text: '2009',
                    display: true,
                    position: 'top',
                    fontSize: 40
                },
                responsive: false,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: false

                }
            }
        }

        return data;
    }


}