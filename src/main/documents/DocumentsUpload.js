import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import IdDocuments from './steps/IdDocuments';
import ProfessionalDocuments from './steps/ProfessionalDocuments';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Documentación Personal', 'Documentación Profesional'];
}

function getStepContent(step, callback) {
  switch (step) {
    case 0:
      return <IdDocuments next={callback} />;
    case 1:
      return <ProfessionalDocuments next={callback} />;
    default:
      return 'Unknown step';
  }
}

export default function DocumentsUpload() {
  const classes = useStyles();

  const [disableNext, setDisableNext] = useState(true)

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const isStepOptional = step => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    enableNext(false);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function enableNext(val) {
    if (val === true) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Hemos recibido tus documentos exitosamente.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Volver a subirlos
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, enableNext)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Regresar
              </Button>

              <Button
                disabled={disableNext}
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
