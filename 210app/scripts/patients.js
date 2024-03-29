currPatient = '96686_226409'; // subjectID_icustayId

charts = {
  'heartrate':{
    _type: 'scatter',
    _yrange: [20,140],
    normalRange:[60,100],
    title:'bpm'
  },
  'bp':{
    _type: 'scatter',
    _yrange: [0,160],
    normalRange:[80,120],
    title:'mmHg'
  },
  'temp':{
    _type: 'scatter',
    _yrange: [90,105],
    normalRange:[97,99],
    title:'Fahrenheit'
  },
  'O2':{
    _type: 'scatter',
    _yrange: [60,101],
    normalRange:[90,100],
    title:'%'
  },
  'resp':{
    _type: 'scatter',
    _yrange: [0,40],
    normalRange:[12,18],
    title:'insp/min'
  },
  'neuro':{
    _type: 'scatter',
    _yrange: [0,7],
    normalRange:[0,0]
  },
  'creatinine':{
    _type: 'scatter',
    _yrange: [0,3],
    normalRange:[0.6,1.3],
    title:'mg/dL'
  },
  'scatter':{
    _type:'scatter',
    normalRange:[0,0]
  },
  'bar':{
    _type:'bar',
    normalRange:[0,0]
  }

}
patients = {
    '109_217934':{
        duration:['2142-07-17 07:48:43', '2142-07-18 20:28:26'],
        name:"Jane Doe - Lupus",
        admission_notes : ENV+"data/admin-notes-109_217934.html",
        discharge_notes : ENV+"data/discharge-notes-109_217934.html",
        features : [
            {
              files:['heartrate'],
              format:'csv'
            },
            {
              files:['temp'],
              format:'csv'
            },
            {
              files:['o2'],
              format:'csv'
            },
            {
              files:['nibp'],
              format:'csv'
            },
            {
              files:['Neurochecks'],
              format:'json'
            },
            {
              files:['sum_by_hour_all_inputs','sum_by_hour_all_outputs'],
              format:'csv'
            }
        ],
        charts:[
          charts.heartrate,
          charts.temp,
          charts.O2,
          charts.bp,
          charts.neuro,
          charts.bar
        ],
        stats : {
          "Gender" : "Female",
          "Age" :  24.9,
          "Weight" : "<span class='warning'>*</span>",
          "Height" : "<span class='warning'>*</span>",
          "Marital Status" : "Single",
          "Diagnosis" : "Lupus",
          "Ventilation" : "No",
          "Intubation" : "No",
          "Code Status" : "Full Code",
          "Length of Stay" : "1.5 days",
          "Social Work Consult" : "Yes",
          "Case Mngt Discharge Plan" : "<span class='warning'>*</span>",
        },
        probalities : {
          'HOME': [ 0.68953776,  0.31046227],
          'HOSPITAL': [ 0.68953776,  0.31046227],
          'LONGTERM' : [ 0.68953776,  0.31046227],
          'OTHER': [ 0.68953776,  0.31046227]
        }
    },
    '99383_236117':{
        duration:['2131-07-09 18:13:51',  '2131-07-12 16:54:54'],
        name:"John Smith - Septic Shock",
        admission_notes : ENV+"data/admin-notes-99383_236117.html",
        discharge_notes : ENV+"data/discharge-notes-99383_236117.html",
        features : [
            {
              files:['heartrate'],
              format:'csv'
            },
            {
              files:['temp'],
              format:'csv'
            },
            {
              files:['o2'],
              format:'csv'
            },
            {
              files:['nibp'],
              format:'csv'
            },
            {
              files:['total_resp'],
              format:'csv'
            },
            {
              files:['sum_by_hour_all_inputs','sum_by_hour_all_outputs'],
              format:'csv'
            }
        ],
        charts:[
          charts.heartrate,
          charts.temp,
          charts.O2,
          charts.bp,
          charts.resp,
          charts.bar
        ],
        stats : {
          "Gender" : "Male",
          "Age" :  28,
          "Weight" : "<span class='warning'>*</span>",
          "Height" : "180cm",
          "Marital Status" : "Single",
          "Diagnosis" : "Sepsis",
          "Ventilation" : "No",
          "Intubation" : "No",
          "Code Status" : "Full Code",
          "Length of Stay" : "2.9 days",
          "Social Work Consult" : "<span class='warning'>*</span>",
          "Case Mngt Discharge Plan" : "<span class='warning'>*</span>"
        },
        probalities : {
          'HOME': [ 0.78109103,  0.21890898],
          'HOSPITAL': [ 0.78109103,  0.21890898],
          'LONGTERM' : [ 0.78109103,  0.21890898],
          'OTHER' : [ 0.78109103,  0.21890898]
        }
    },
    '98959_298632':{
        duration:['2142-01-04 10:21:02', '2142-01-06 16:00:27'],
        name:"David Jones - Heart Attack",
        admission_notes : ENV+"data/admin-notes-98959_298632.html",
        discharge_notes : ENV+"data/discharge-notes-98959_298632.html",
        features : [
            {
              files:['heartrate'],
              format:'csv'
            },
            {
              files:['temp'],
              format:'csv'
            },
            {
              files:['o2'],
              format:'csv'
            },
            {
              files:['nibp'],
              format:'csv'
            },
            {
              files:['total_resp'],
              format:'csv'
            },
            {
              files:['Pressure_drugs_nitro'],
              format:'json'
            },
            {
              files:['sum_by_hour_all_inputs','sum_by_hour_all_outputs'],
              format:'csv'
            }
        ],
        charts: [
          charts.heartrate,
          charts.temp,
          charts.O2,
          charts.bp,
          charts.resp,
          charts.scatter,
          charts.bar
        ],
        stats : {
          "Gender" : "Male",
          "Age" : 76,
          "Weight" : "<span class='warning'>*</span>",
          "Height" : "<span class='warning'>*</span>",
          "Marital Status" : "Married",
          "Diagnosis" : "Heart Attack",
          "Ventilation" : "No",
          "Intubation" : "No",
          "Code Status" : "Full Code",
          "EKG" : "Yes",
          "Length of Stay" : "2.2 days",
          "Social Work Consult" : "No",
          "Case Mngt Discharge Plan" : "<span class='warning'>*</span>",
        },
        probalities : {
          'HOME': [ 0.94873542,  0.05126461],
          'HOSPITAL': [ 0.94873542,  0.05126461],
          'LONGTERM' : [ 0.94873542,  0.05126461],
          'OTHER':[ 0.94873542,  0.05126461]
        }
    },
    '96686_226409':{
        duration:['2112-04-03 14:33:47','2112-04-06 18:27:08'],
        name:"Ellen Brown - Diabetes",
        admission_notes : ENV+"data/admin-notes-96686_226409.html",
        discharge_notes : ENV+"data/discharge-notes-96686_226409.html",
        features : [
            {
              files:['heartrate'],
              format:'csv'
            },
            {
              files:['temp'],
              format:'csv'
            },
            {
              files:['o2'],
              format:'csv'
            },
            {
              files:['nibp'],
              format:'csv'
            },
            {
              files:['sum_by_hour_all_inputs','sum_by_hour_all_outputs'],
              format:'csv'
            },
            {files:['creatinine'],format:'csv'},
            {files:['alarms'],format:'csv'}
        ],
        predictors : [
          {files:['creatinine'],format:'csv'},
          {files:['alarms'],format:'csv'}
        ],
        charts:[
          charts.heartrate,
          charts.temp,
          charts.O2,
          charts.bp,
          charts.bar,
          charts.creatinine,
          charts.scatter
        ],
        stats : {
          "Gender" : "Female",
          "Age" :  38,
          "Weight" : "<span class='warning'>*</span>",
          "Height" : "<span class='warning'>*</span>",
          "Marital Status" : "Single",
          "Diagnosis" : "Diabetes",
          "Ventilation" : "No",
          "Intubation" : "No",
          "Code Status" : "<span class='warning'>*</span>",
          "Length of Stay" : "3.2 days",
          "Social Work Consult" : "No",
          "Case Mngt Discharge Plan" : "<span class='warning'>*</span>"
        },
        probalities : {
          'HOME':[ 0.89793843,  0.10206157],
          'HOSPITAL': [ 0.89793843,  0.10206157],
          'LONGTERM': [ 0.89793843,  0.10206157],
          'OTHER':[ 0.89793843,  0.10206157]
        }
    },
    '92137_238410':{
        duration:['2183-07-05 09:37:01',  '2183-07-10 15:05:01'],
        name:"John Baker - Stroke",
        admission_notes : ENV+"data/admin-notes-92137_238410.html",
        discharge_notes : ENV+"data/discharge-notes-92137_238410.html",
        features :[
            {
              files:['heartrate'],
              format:'csv'
            },
            {
              files:['temp'],
              format:'csv'
            },
            {
              files:['o2'],
              format:'csv'
            },
            {
              files:['nibp'],
              format:'csv'
            },
            {
              files:['Neurochecks'],
              format:'json'
            },
            {
              files:['total_resp'],
              format:'csv'
            },
            {
              files:['sum_by_hour_all_inputs','sum_by_hour_all_outputs'],
              format:'csv'
            }
        ],
        charts:[
          charts.heartrate,
          charts.temp,
          charts.O2,
          charts.bp,
          charts.neuro,
          charts.resp,
          charts.bar
        ],
        stats : {
          "Gender" : "Male",
          "Age" : 65.8,
          "Weight" : "<span class='warning'>*</span>",
          "Height" : "180cm",
          "Marital Status" : "Married",
          "Diagnosis" : "Stroke",
          "CT Scan" : "<span class='warning'>*</span>",
          "MRI":"Yes",
          "Alteplase (TPA)": "No",
          "Physical Therapy" : "<span class='warning'>*</span>",
          "Ventilation" : "No",
          "Intubation" : "No",
          "Code Status" : "Full Code",
          "Length of Stay" : "5.2 days",
          "Social Work Consult" :"<span class='warning'>*</span>",
          "Case Mngt Discharge Plan" : "<span class='warning'>*</span>"
        },
        probalities : {
          'HOME': [ 0.92475569,  0.07524428],
          'HOSPITAL': [ 0.92475569,  0.07524428],
          'LONGTERM' :[ 0.92475569,  0.07524428],
          'OTHER':[ 0.92475569,  0.07524428]
        }
    }
};

featureDict = {
  'heartrate': "Heart Rate",
  'temp':"Temp F",
  'o2':'O2 Saturation',
  'nibp':'NIBP - Mean',
  'total_resp':'Respiration Rate (Total)',
  'sum_by_hour_all_inputs':'Input Volume (ml)',
  'sum_by_hour_all_outputs':'Output Volume (ml)',
  'Pressure_drugs_nitro': 'Pressure Drugs',
  'creatinine':'Creatinine',
  'alarms':'Alarms On',
  'Neurochecks':'Neurochecks',
  'arrays':{
    'sum_by_hour_all_inputs':'Fluids'
  }
};


