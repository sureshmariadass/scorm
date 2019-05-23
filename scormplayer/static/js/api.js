var debug = true;

// ------------------------------------------
//   SCORM RTE Functions - Initialization
// ------------------------------------------
function LMSInitialize(dummyString) {
  if (debug) { alert('*** LMSInitialize ***'); }
  return "true";
}

// ------------------------------------------
//   SCORM RTE Functions - Getting and Setting Values
// ------------------------------------------
function LMSGetValue(varname) {
  if (debug) {
    alert('*** LMSGetValue varname='+varname
                          +' varvalue=value ***');
  }
  return "value";
}

function LMSSetValue(varname,varvalue) {
  if (debug) {
    alert('*** LMSSetValue varname='+varname
                          +' varvalue='+varvalue+' ***');
  }
  return "true";
}

function LMSCommit(dummyString) {
  if (debug) { alert('*** LMSCommit ***'); }
  return "true";
}

// ------------------------------------------
//   SCORM RTE Functions - Closing The Session
// ------------------------------------------
function LMSFinish(dummyString) {
  if (debug) { alert('*** LMSFinish ***'); }
  return "true";
}

// ------------------------------------------
//   SCORM RTE Functions - Error Handling
// ------------------------------------------
function LMSGetLastError() {
  if (debug) { alert('*** LMSGetLastError ***'); }
  return 0;
}

function LMSGetDiagnostic(errorCode) {
  if (debug) {
    alert('*** LMSGetDiagnostic errorCode='+errorCode+' ***');
  }
  return "diagnostic string";
}

function LMSGetErrorString(errorCode) {
  if (debug) {
    alert('*** LMSGetErrorString errorCode='+errorCode+' ***');
  }
  return "error string";
}
