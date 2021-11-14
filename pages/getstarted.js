/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { jsPDF } from 'jspdf'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, AccordionItemState, resetNextUuid } from 'react-accessible-accordion'

const formSchema = Yup.object().shape({
  fullName: Yup.string().max(50, 'Must be less than 50 characters long.'),
  dob: Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Must be YYYY-MM-DD'),
  address1: Yup.string().max(36, 'Must be less than 36 characters long.'),
  address1State: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  address1Zip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  address2: Yup.string().max(36, 'Must be less than 36 characters long.'),
  address2State: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  address2Zip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  homePhone: Yup.string().max(24, 'Must be less than 24 characters long.'),
  cellPhone: Yup.string().max(24, 'Must be less than 24 characters long.'),
  email: Yup.string().max(34, 'Must be less than 34 characters long.'),
  otherEmail: Yup.string().max(30, 'Must be less than 30 characters long.'),
  information1: Yup.string().max(80, 'Must be less than 80 characters long.'),
  information2: Yup.string().max(80, 'Must be less than 80 characters long.'),
  information3: Yup.string().max(80, 'Must be less than 80 characters long.'),
  information4: Yup.string().max(80, 'Must be less than 80 characters long.'),
  businessName: Yup.string().max(64, 'Must be less than 64 characters long.'),
  businessAddress: Yup.string().max(36, 'Must be less than 36 characters long.'),
  businessAddressState: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  businessAddressZip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  officePhone: Yup.string().max(66, 'Must be less than 66 characters long.'),
  workPointOfContact1: Yup.string().max(80, 'Must be less than 80 characters long.'),
  workPointOfContact2: Yup.string().max(80, 'Must be less than 80 characters long.'),
  workEmergencyPlan1: Yup.string().max(80, 'Must be less than 80 characters long.'),
  workEmergencyPlan2: Yup.string().max(80, 'Must be less than 80 characters long.'),
  workEmergencyPlan3: Yup.string().max(80, 'Must be less than 80 characters long.'),
  workEmergencyPlan4: Yup.string().max(80, 'Must be less than 80 characters long.'),
  child1Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child1Dob: Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Must be YYYY-MM-DD'),
  child1Sex: Yup.string().length(1, 'Must be 1-letter sex designation, eg M, F, X.'),
  child1IdentifyingCharacteristics: Yup.string().max(54, 'Must be less than 54 characters long.'),
  child1School: Yup.string().max(20, 'Must be less than 20 characters long.'),
  child1SchoolAddress: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child1SchoolPhone: Yup.string().max(22, 'Must be less than 22 characters long.'),
  child1CellPhone: Yup.string().max(32, 'Must be less than 32 characters long.'),
  child2Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child2Dob: Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Must be YYYY-MM-DD'),
  child2Sex: Yup.string().length(1, 'Must be 1-letter sex designation, eg M, F, X.'),
  child2IdentifyingCharacteristics: Yup.string().max(54, 'Must be less than 54 characters long.'),
  child2School: Yup.string().max(20, 'Must be less than 20 characters long.'),
  child2SchoolAddress: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child2SchoolPhone: Yup.string().max(22, 'Must be less than 22 characters long.'),
  child2CellPhone: Yup.string().max(32, 'Must be less than 32 characters long.'),
  child3Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child3Dob: Yup.string().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'Must be YYYY-MM-DD'),
  child3Sex: Yup.string().length(1, 'Must be 1-letter sex designation, eg M, F, X.'),
  child3IdentifyingCharacteristics: Yup.string().max(54, 'Must be less than 54 characters long.'),
  child3School: Yup.string().max(20, 'Must be less than 20 characters long.'),
  child3SchoolAddress: Yup.string().max(30, 'Must be less than 30 characters long.'),
  child3SchoolPhone: Yup.string().max(22, 'Must be less than 22 characters long.'),
  child3CellPhone: Yup.string().max(32, 'Must be less than 32 characters long.'),
  neighborhoodEmergencyMeetingPlaceName: Yup.string().max(72, 'Must be less than 72 characters long.'),
  neighborhoodEmergencyMeetingPlaceAddress: Yup.string().max(28, 'Must be less than 28 characters long.'),
  neighborhoodEmergencyMeetingPlaceState: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  neighborhoodEmergencyMeetingPlaceZip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  neighborhoodEmergencyMeetingPlacePhone: Yup.string().max(14, 'Must be less than 14 characters long.'),
  neighborhoodEmergencyMeetingPlaceInstructions: Yup.string().max(44, 'Must be less than 44 characters long.'),
  outOfNeighborhoodEmergencyMeetingPlaceName: Yup.string().max(72, 'Must be less than 72 characters long.'),
  outOfNeighborhoodEmergencyMeetingPlaceAddress: Yup.string().max(28, 'Must be less than 28 characters long.'),
  outOfNeighborhoodEmergencyMeetingPlaceState: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  outOfNeighborhoodEmergencyMeetingPlaceZip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  outOfNeighborhoodEmergencyMeetingPlacePhone: Yup.string().max(14, 'Must be less than 14 characters long.'),
  outOfNeighborhoodEmergencyMeetingPlaceInstructions: Yup.string().max(44, 'Must be less than 44 characters long.'),
  outOfTownEmergencyMeetingPlaceName: Yup.string().max(72, 'Must be less than 72 characters long.'),
  outOfTownEmergencyMeetingPlaceAddress: Yup.string().max(28, 'Must be less than 28 characters long.'),
  outOfTownEmergencyMeetingPlaceState: Yup.string().length(2, 'Must be 2-letter State abbreviation'),
  outOfTownEmergencyMeetingPlaceZip: Yup.string().length(5, 'Must be 5-digit ZIP code'),
  outOfTownEmergencyMeetingPlacePhone: Yup.string().max(14, 'Must be less than 14 characters long.'),
  outOfTownEmergencyMeetingPlaceInstructions: Yup.string().max(44, 'Must be less than 44 characters long.'),
  importantNumbers1Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers1Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers2Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers2Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers3Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers3Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers4Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers4Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers5Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers5Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers6Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers6Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers7Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers7Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  importantNumbers8Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  importantNumbers8Phone: Yup.string().max(34, 'Must be less than 34 characters long.'),
  pets1Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  pets1Type: Yup.string().max(20, 'Must be less than 20 characters long.'),
  pets1Age: Yup.string().max(10, 'Must be less than 10 characters long.'),
  pets2Name: Yup.string().max(30, 'Must be less than 30 characters long.'),
  pets2Type: Yup.string().max(20, 'Must be less than 20 characters long.'),
  pets2Age: Yup.string().max(10, 'Must be less than 10 characters long.'),
  petsVet: Yup.string().max(66, 'Must be less than 66 characters long.'),
})

export default function GetStarted() {
  resetNextUuid()
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Emergency Wallet Cards - Be ready before the next emergency</title>
        <link rel="icon" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264854/emergencywalletcards.com/favicons/favicon_cv2eb0.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/favicon-32x32_tybret.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/favicon-16x16_blucad.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/apple-touch-icon-144x144_wrxg1f.png" />
        <meta property="og:title" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta property="og:site_name" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta property="og:description" content="Generate a card with important information that you can print, cut out, and fold for safe-keeping in your wallet or purse, ready the moment you need it."/>
        <meta property="og:url" content="https://emergencywalletcards.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://res.cloudinary.com/wilrnh/image/upload/c_pad,h_630,w_1200/v1632264208/emergencywalletcards.com/ewc-color_l7fsin.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="emergencywalletcards.com"/>
        <meta property="twitter:url" content="https://emergencywalletcards.com"/>
        <meta name="twitter:title" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta name="twitter:description" content="Generate a card with important information that you can print, cut out, and fold for safe-keeping in your wallet or purse, ready the moment you need it."/>
        <meta name="twitter:image" content="https://res.cloudinary.com/wilrnh/image/upload/c_pad,h_630,w_1200/v1632264208/emergencywalletcards.com/ewc-color_l7fsin.png"/>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Link href="/">
          <a>
           <img className="w-80" src="https://res.cloudinary.com/wilrnh/image/upload/v1632264208/emergencywalletcards.com/ewc-color_ob4dsn.svg" alt="Emergency Wallet Cards Logo"/>
          </a>
        </Link>
        <p className="mt-3 text-lg">Be ready before the next emergency</p>
        <p className="p-4">Remember, no information is required so feel free to skip as many fields as you like.</p>
        <p className="p-4">Then print the generated PDF on letter sized paper, cut and fold and safely keep it in your wallet or purse.</p>
        <Formik
          initialValues = {{ 
            fullName: '',
            dob: '',
            address1: '',
            address1State: '',
            address1Zip: '',
            address2: '',
            address2State: '',
            address2Zip: '',
            homePhone: '',
            cellPhone: '',
            email: '',
            otherEmail: '',
            information1: '',
            information2: '',
            information3: '',
            information4: '',
            businessName: '',
            businessAddress: '',
            businessAddressState: '',
            businessAddressZip: '',
            officePhone: '',
            workPointOfContact1: '',
            workPointOfContact2: '',
            workEmergencyPlan1: '',
            workEmergencyPlan2: '',
            workEmergencyPlan3: '',
            workEmergencyPlan4: '',
            child1Name: '',
            child1Dob: '',
            child1Sex: '',
            child1IdentifyingCharacteristics: '',
            child1School: '',
            child1SchoolAddress: '',
            child1SchoolPhone: '',
            child1CellPhone: '',
            child2Name: '',
            child2Dob: '',
            child2Sex: '',
            child2IdentifyingCharacteristics: '',
            child2School: '',
            child2SchoolAddress: '',
            child2SchoolPhone: '',
            child2CellPhone: '',
            child3Name: '',
            child3Dob: '',
            child3Sex: '',
            child3IdentifyingCharacteristics: '',
            child3School: '',
            child3SchoolAddress: '',
            child3SchoolPhone: '',
            child3CellPhone: '',
            neighborhoodEmergencyMeetingPlaceName: '',
            neighborhoodEmergencyMeetingPlaceAddress: '',
            neighborhoodEmergencyMeetingPlaceState: '',
            neighborhoodEmergencyMeetingPlaceZip: '',
            neighborhoodEmergencyMeetingPlacePhone: '',
            neighborhoodEmergencyMeetingPlaceInstructions: '',
            outOfNeighborhoodEmergencyMeetingPlaceName: '',
            outOfNeighborhoodEmergencyMeetingPlaceAddress: '',
            outOfNeighborhoodEmergencyMeetingPlaceState: '',
            outOfNeighborhoodEmergencyMeetingPlaceZip: '',
            outOfNeighborhoodEmergencyMeetingPlacePhone: '',
            outOfNeighborhoodEmergencyMeetingPlaceInstructions: '',
            outOfTownEmergencyMeetingPlaceName: '',
            outOfTownEmergencyMeetingPlaceAddress: '',
            outOfTownEmergencyMeetingPlaceState: '',
            outOfTownEmergencyMeetingPlaceZip: '',
            outOfTownEmergencyMeetingPlacePhone: '',
            outOfTownEmergencyMeetingPlaceInstructions: '',
            importantNumbers1Name: '',
            importantNumbers1Phone: '',
            importantNumbers2Name: '',
            importantNumbers2Phone: '',
            importantNumbers3Name: '',
            importantNumbers3Phone: '',
            importantNumbers4Name: '',
            importantNumbers4Phone: '',
            importantNumbers5Name: '',
            importantNumbers5Phone: '',
            importantNumbers6Name: '',
            importantNumbers6Phone: '',
            importantNumbers7Name: '',
            importantNumbers7Phone: '',
            importantNumbers8Name: '',
            importantNumbers8Phone: '',
            pets1Name: '',
            pets1Type: '',
            pets1Age: '',
            pets2Name: '',
            pets2Type: '',
            pets2Age: '',
            petsVet: '',
          }}
          validationSchema = { formSchema }
          onSubmit = { (values, {setSubmitting}) => {
            var ewc_logo_mono_png = 'data:image/png;base64,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'
            var ewc_fold_example_png = 'data:image/png;base64,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'
            var ewc_fold_example_hidpi_png = 'data:image/png;base64,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';
            // create new pdf doc
            // jsPDF maintains a nice realtime editor: http://raw.githack.com/MrRio/jsPDF/master/
            var doc = new jsPDF({
              orientation: 'p',
              unit: 'mm',
              format: 'letter',
              putOnlyUsedFonts:true,
              compress: true,
              precision: 2,
              floatPrecision: 2
            });
            // draw cutout
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.setLineWidth(1)
            doc.setLineDashPattern([3,3]);
            doc.roundedRect(60, 10, 85, 50, 5, 5, "FD");
            doc.roundedRect(60, 60, 85, 50, 5, 5, "FD");
            doc.roundedRect(60, 110, 85, 50, 5, 5, "FD");
            doc.roundedRect(60, 160, 85, 50, 5, 5, "FD");
            doc.roundedRect(60, 210, 85, 50, 5, 5, "FD");
            // reset lines
            doc.setLineDashPattern().setLineWidth(0.1)
            // set font
            doc.setFont("Times");
            doc.setFontSize(6)
            // add cut and fold instructions
            doc.addImage(ewc_fold_example_png, 'PNG', 5, 14, 46, 36)
            doc.text("<FOLD HERE>",44,60)
            doc.text("<FOLD HERE>",44,110)
            doc.text("<FOLD HERE>",44,160)
            doc.text("<FOLD HERE>",44,210)
            // card 1
            doc.addImage(ewc_logo_mono_png, 'PNG', 65, 14, 30, 7)
            doc.setFont("Times","bold")
            doc.text("Personal Info",140,20,null,null,"right")
            doc.text("Name:",65,25);
            doc.setFont("Times","normal")
            doc.text(`${values.fullName}`, 72, 25)
            doc.setFont("Times","bold")
            doc.text("DOB:", 120, 25);
            doc.setFont("Times","normal")
            doc.text(`${values.dob}`,126,25)
            doc.line(65, 26, 140, 26)
            doc.setFont("Times","bold")
            doc.text("Address 1:", 65, 28);
            doc.setFont("Times","normal")
            doc.text(`${values.address1}`, 75, 28)
            doc.setFont("Times","bold")
            doc.text("State:", 110, 28)
            doc.setFont("Times","normal")
            doc.text(`${values.address1State}`, 116, 28)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 120, 28)
            doc.setFont("Times","normal")
            doc.text(`${values.address1Zip}`, 125, 28)
            doc.line(65, 29, 140, 29)
            doc.setFont("Times","bold")
            doc.text("Address 2:", 65, 31);
            doc.setFont("Times","normal")
            doc.text(`${values.address2}`, 75, 31)
            doc.setFont("Times","bold")
            doc.text("State:", 110, 31)
            doc.setFont("Times","normal")
            doc.text(`${values.address2State}`, 116, 31)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 120, 31)
            doc.setFont("Times","normal")
            doc.text(`${values.address2Zip}`, 125, 31)
            doc.line(65, 32, 140, 32)
            doc.setFont("Times","bold")
            doc.text("Home Phone:", 65, 34);
            doc.setFont("Times","normal")
            doc.text(`${values.homePhone}`, 77, 34)
            doc.setFont("Times","bold")
            doc.text("Email:", 100, 34)
            doc.setFont("Times","normal")
            doc.text(`${values.email}`, 107, 34)
            doc.line(65, 35, 140, 35)
            doc.setFont("Times","bold")
            doc.text("Cell Phone:", 65, 37);
            doc.setFont("Times","normal")
            doc.text(`${values.cellPhone}`, 76, 37)
            doc.setFont("Times","bold")
            doc.text("Other Email:", 100, 37);
            doc.setFont("Times","normal")
            doc.text(`${values.otherEmail}`, 112, 37)
            doc.line(65, 38, 140, 38)
            doc.setFont("Times","bold")
            doc.text("Important Information:", 65, 40);
            doc.setFont("Times","normal")
            doc.line(65,44,140,44)
            doc.text(`${values.information1}`, 65, 43)
            doc.line(65,47,140,47)
            doc.text(`${values.information2}`, 65, 46)
            doc.line(65,50,140,50)
            doc.text(`${values.information3}`, 65, 49)
            doc.line(65,53,140,53)
            doc.text(`${values.information4}`, 65, 52)
            // card 2
            doc.setFont("Times","bold")
            doc.text("Work",140,65,null,null,"right")
            doc.text("Business Name:", 65, 70);
            doc.setFont("Times","normal")
            doc.text(`${values.businessName}`,80,70)
            doc.line(65, 71, 140, 71)
            doc.setFont("Times","bold")
            doc.text("Address 1:", 65, 73);
            doc.setFont("Times","normal")
            doc.text(`${values.businessAddress}`, 75, 73)
            doc.setFont("Times","bold")
            doc.text("State:", 110, 73)
            doc.setFont("Times","normal")
            doc.text(`${values.businessAddressState}`, 115, 73)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 120, 73)
            doc.setFont("Times","normal")
            doc.text(`${values.businessAddressZip}`,125,73)
            doc.line(65, 74, 140, 74)
            doc.setFont("Times","bold")
            doc.text("Office Phone:", 65, 76);
            doc.setFont("Times","normal")
            doc.text(`${values.officePhone}`,77,76)
            doc.line(65, 77, 140, 77)
            doc.setFont("Times","bold")
            doc.text("Point of Contact/Special Instructions:", 65, 79);
            doc.setFont("Times","normal")
            doc.line(65,80,140,80)
            doc.text(`${values.workPointOfContact1}`,65,82)
            doc.line(65,83,140,83)
            doc.text(`${values.workPointOfContact2}`,65,86)
            doc.line(65, 87, 140, 87)
            doc.setFont("Times","bold")
            doc.text("Work Emergency Plan:", 65, 89);
            doc.setFont("Times","normal")
            doc.line(65,90,140,90)
            doc.text(`${values.workEmergencyPlan1}`,65,92)
            doc.line(65,93,140,93)
            doc.text(`${values.workEmergencyPlan2}`,65,95)
            doc.line(65,96,140,96)
            doc.text(`${values.workEmergencyPlan3}`,65,98)
            doc.line(65,99,140,99)
            doc.text(`${values.workEmergencyPlan4}`,65,101)
            doc.line(65,102,140,102)
            // card 3
            doc.setFont("Times","bold")
            doc.text("Children",140,115,null,null,"right")
            doc.text("Name:", 65, 116);
            doc.setFont("Times","normal")
            doc.text(`${values.child1Name}`, 72, 116)
            doc.setFont("Times","bold")
            doc.text("DOB:", 100, 116)
            doc.setFont("Times","normal")
            doc.text(`${values.child1Dob}`, 106, 116)
            doc.setFont("Times","bold")
            doc.text("Sex:", 120, 116)
            doc.setFont("Times","normal")
            doc.text(`${values.child1Sex}`,125,116)
            doc.line(65, 117, 140, 117)
            doc.setFont("Times","bold")
            doc.text("Identifying Characteristics:", 65, 119);
            doc.setFont("Times","normal")
            doc.text(`${values.child1IdentifyingCharacteristics}`,89,119)
            doc.line(65, 120, 140, 120)
            doc.setFont("Times","bold")
            doc.text("School/Daycare:", 65, 122);
            doc.setFont("Times","normal")
            doc.text(`${values.child1School}`, 80, 122)
            doc.setFont("Times","bold")
            doc.text("Address:", 100, 122)
            doc.setFont("Times","normal")
            doc.text(`${values.child1SchoolAddress}`,108,122)
            doc.line(65, 123, 140, 123)
            doc.setFont("Times","bold")
            doc.text("School Phone:", 65, 125);
            doc.setFont("Times","normal")
            doc.text(`${values.child1SchoolPhone}`, 78, 125)
            doc.setFont("Times","bold")
            doc.text("Cell Phone:", 100, 125);
            doc.setFont("Times","normal")
            doc.text(`${values.child1CellPhone}`,110,125)
            doc.line(65, 126, 140, 126)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 128);
            doc.setFont("Times","normal")
            doc.text(`${values.child2Name}`, 72, 128)
            doc.setFont("Times","bold")
            doc.text("DOB:", 100, 128)
            doc.setFont("Times","normal")
            doc.text(`${values.child2Dob}`, 106, 128)
            doc.setFont("Times","bold")
            doc.text("Sex:", 120, 128)
            doc.setFont("Times","normal")
            doc.text(`${values.child2Sex}`,125,128)
            doc.line(65, 129, 140, 129)
            doc.setFont("Times","bold")
            doc.text("Identifying Characteristics:", 65, 131);
            doc.setFont("Times","normal")
            doc.text(`${values.child2IdentifyingCharacteristics}`,89,131)
            doc.line(65, 132, 140, 132)
            doc.setFont("Times","bold")
            doc.text("School/Daycare:", 65, 134);
            doc.setFont("Times","normal")
            doc.text(`${values.child2School}`, 80, 134)
            doc.setFont("Times","bold")
            doc.text("Address:", 100, 134)
            doc.setFont("Times","normal")
            doc.text(`${values.child2SchoolAddress}`,108,134)
            doc.line(65, 135, 140, 135)
            doc.setFont("Times","bold")
            doc.text("School Phone:", 65, 137);
            doc.setFont("Times","normal")
            doc.text(`${values.child2SchoolPhone}`, 78, 137)
            doc.setFont("Times","bold")
            doc.text("Cell Phone:", 100, 137);
            doc.setFont("Times","normal")
            doc.text(`${values.child2CellPhone}`,110,137)
            doc.line(65, 138, 140, 138)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 140);
            doc.setFont("Times","normal")
            doc.text(`${values.child3Name}`, 72, 140)
            doc.setFont("Times","bold")
            doc.text("DOB:", 100, 140)
            doc.setFont("Times","normal")
            doc.text(`${values.child3Dob}`, 106, 140)
            doc.setFont("Times","bold")
            doc.text("Sex:", 120, 140)
            doc.setFont("Times","normal")
            doc.text(`${values.child3Sex}`,125,140)
            doc.line(65, 141, 140, 141)
            doc.setFont("Times","bold")
            doc.text("Identifying Characteristics:", 65, 143);
            doc.setFont("Times","normal")
            doc.text(`${values.child3IdentifyingCharacteristics}`,89,143)
            doc.line(65, 144, 140, 144)
            doc.setFont("Times","bold")
            doc.text("School/Daycare:", 65, 146);
            doc.setFont("Times","normal")
            doc.text(`${values.child3School}`, 80, 146)
            doc.setFont("Times","bold")
            doc.text("Address:", 100, 146)
            doc.setFont("Times","normal")
            doc.text(`${values.child3SchoolAddress}`,108,146)
            doc.line(65, 147, 140, 147)
            doc.setFont("Times","bold")
            doc.text("School Phone:", 65, 149);
            doc.setFont("Times","normal")
            doc.text(`${values.child3SchoolPhone}`, 78, 149)
            doc.setFont("Times","bold")
            doc.text("Cell Phone:", 100, 149);
            doc.setFont("Times","normal")
            doc.text(`${values.child3CellPhone}`,110,149)
            doc.line(65,150,140,150)
            // card 4
            doc.setFont("Times","bold")
            doc.text("Neighborhood Emergency Meeting Place",140,165,null,null,"right")
            doc.text("Name:", 65, 166);
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlaceName}`,72,166)
            doc.line(65, 167, 140, 167)
            doc.setFont("Times","bold")
            doc.text("Address:", 65, 169);
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlaceAddress}`, 73, 169)
            doc.setFont("Times","bold")
            doc.text("State:", 100, 169)
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlaceState}`, 105, 169)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 110, 169)
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlaceZip}`, 115, 169)
            doc.setFont("Times","bold")
            doc.text("Phone:", 120, 169)
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlacePhone}`,126,169)
            doc.line(65, 170, 140, 170)
            doc.setFont("Times","bold")
            doc.text("Point of Contact/Special Instructions:", 65, 172);
            doc.setFont("Times","normal")
            doc.text(`${values.neighborhoodEmergencyMeetingPlaceInstructions}`,98,172)
            doc.line(65,173,140,173)
            doc.setFont("Times","bold")
            doc.text("Out of Neighborhood Emergency Meeting Place",140,178,null,null,"right")
            doc.text("Name:", 65, 179);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceName}`,72,179)
            doc.line(65, 180, 140, 180)
            doc.setFont("Times","bold")
            doc.text("Address:", 65, 182);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceAddress}`, 73, 182)
            doc.setFont("Times","bold")
            doc.text("State:", 100, 182)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceState}`, 105, 182)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 110, 182)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceZip}`, 115, 182)
            doc.setFont("Times","bold")
            doc.text("Phone:", 120, 182)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlacePhone}`,126,182)
            doc.line(65, 183, 140, 183)
            doc.setFont("Times","bold")
            doc.text("Point of Contact/Special Instructions:", 65, 185);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceInstructions}`,98,185)
            doc.line(65,186,140,186)
            doc.setFont("Times","bold")
            doc.text("Out of Town Emergency Meeting Place",140,191,null,null,"right")
            doc.text("Name:", 65, 192);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceName}`,72,192)
            doc.line(65, 193, 140, 193)
            doc.setFont("Times","bold")
            doc.text("Address:", 65, 195);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceAddress}`, 73, 195)
            doc.setFont("Times","bold")
            doc.text("State:", 100, 195)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceState}`, 105, 195)
            doc.setFont("Times","bold")
            doc.text("ZIP:", 110, 195)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceZip}`, 115, 195)
            doc.setFont("Times","bold")
            doc.text("Phone:", 120, 195)
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlacePhone}`,126,195)
            doc.line(65, 196, 140, 196)
            doc.setFont("Times","bold")
            doc.text("Point of Contact/Special Instructions:", 65, 198);
            doc.setFont("Times","normal")
            doc.text(`${values.outOfNeighborhoodEmergencyMeetingPlaceInstructions}`,98,198)
            doc.line(65,199,140,199)
            // card 5
            doc.setFont("Times","bold")
            doc.text("Important Numbers or Information",140,215,null,null,"right")
            doc.text("Name:", 65, 218);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers1Name}`, 71, 218)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 218)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers1Phone}`,108,218)
            doc.line(65, 219, 140, 219)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 221);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers2Name}`, 71, 221)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 221)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers2Phone}`,108,221)
            doc.line(65, 222, 140, 222)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 224);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers3Name}`, 71, 224)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 224)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers3Phone}`,108,224)
            doc.line(65, 225, 140, 225)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 227);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers4Name}`, 71, 227)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 227)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers4Phone}`,108,227)
            doc.line(65, 228, 140, 228)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 230);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers5Name}`, 71, 230)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 230)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers5Phone}`,108,230)
            doc.line(65, 231, 140, 231)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 233);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers6Name}`, 71, 233)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 233)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers6Phone}`,108,233)
            doc.line(65, 234, 140, 234)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 236);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers7Name}`, 71, 236)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 236)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers7Phone}`,108,236)
            doc.line(65, 237, 140, 237)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 239);
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers8Name}`, 71, 239)
            doc.setFont("Times","bold")
            doc.text("Phone:", 100, 239)
            doc.setFont("Times","normal")
            doc.text(`${values.importantNumbers8Phone}`,108,239)
            doc.setFont("Times","bold")
            doc.text("Pets",140,242,null,null,"right")
            doc.text("Name:", 65, 245);
            doc.setFont("Times","normal")
            doc.text(`${values.pets1Name}`, 71, 245)
            doc.setFont("Times","bold")
            doc.text("Type:", 100, 245)
            doc.setFont("Times","normal")
            doc.text(`${values.pets1Type}`, 105, 245)
            doc.setFont("Times","bold")
            doc.text("Age:", 125, 245)
            doc.setFont("Times","normal")
            doc.text(`${values.pets1Age}`,130,245)
            doc.line(65, 246, 140, 246)
            doc.setFont("Times","bold")
            doc.text("Name:", 65, 248);
            doc.setFont("Times","normal")
            doc.text(`${values.pets2Name}`, 71, 248)
            doc.setFont("Times","bold")
            doc.text("Type:", 100, 248)
            doc.setFont("Times","normal")
            doc.text(`${values.pets2Type}`, 105, 248)
            doc.setFont("Times","bold")
            doc.text("Age:", 125, 248)
            doc.setFont("Times","normal")
            doc.text(`${values.pets2Age}`,130,248)
            doc.line(65, 249, 140, 249)
            doc.setFont("Times","bold")
            doc.text("Veterinarian:", 65, 251)
            doc.setFont("Times","normal")
            doc.text(`${values.petsVet}`,78,251)
            doc.line(65, 252, 140, 252)
            doc.setFont("Times","bold")
            doc.text("DIAL 911 FOR EMERGENCIES", 105, 254, null, null, "center");
            // spit out the card
            doc.save("Emergency Wallet Card" + (values.fullName ? ' for ' + values.fullName : ''))
            setSubmitting(false) // allow multiple submits
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg">
              <Accordion preExpanded={['personal-info']}>
                <AccordionItem uuid={"personal-info"}>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Personal Info</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullName">
                          Full Name
                        </label>
                        <Field type="text" name="fullName" id="fullName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" autoFocus={true}/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="fullName" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dob">
                          Date of Birth
                        </label>
                        <Field type="date" name="dob" id="dob" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="dob" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address1">
                          Address (1)
                        </label>
                        <Field type="text" name="address1" id="address1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address1" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address1State">
                          State
                        </label>
                        <Field type="text" name="address1State" id="address1State" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address1State" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address1Zip">
                          ZIP
                        </label>
                        <Field type="text" name="address1Zip" id="address1Zip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address1Zip" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address2">
                          Address (2)
                        </label>
                        <Field type="text" name="address2" id="address2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address2" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address2State">
                          State
                        </label>
                        <Field type="text" name="address2State" id="address2State" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address2State" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address2Zip">
                          ZIP
                        </label>
                        <Field type="text" name="address2Zip" id="address2Zip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="address2Zip" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="homePhone">
                          Home Phone
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" id="homePhone" name="homePhone"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="homePhone" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cellPhone">
                          Cell Phone
                        </label>
                        <Field type="tel" id="cellPhone" name="cellPhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="cellPhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                          Email
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" id="email" name="email"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="email" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="otherEmail">
                          Other Email
                        </label>
                        <Field type="email" id="otherEmail" name="otherEmail" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="otherEmail" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="information1">
                          Information
                        </label>
                        <Field type="text" name="information1" id="information1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="information1" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="information2" id="information2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="information2" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="information3" id="information3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="information3" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="information4" id="information4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="information4" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Work</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessName">
                          Business Name
                        </label>
                        <Field type="text" name="businessName" id="businessName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="businessName" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessAddress">
                          Address (1)
                        </label>
                        <Field type="text" name="businessAddress" id="businessAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="businessAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessAddressState">
                          State
                        </label>
                        <Field type="text" name="businessAddressState" id="businessAddressState" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="businessAddressState" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessAddressZip">
                          ZIP
                        </label>
                        <Field type="text" name="businessAddressZip" id="businessAddressZip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="businessAddressZip" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="officePhone">
                          Office Phone
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" id="officePhone" name="officePhone"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="officePhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="workPointOfContact1">
                          Point of Contact/Special Instructions:
                        </label>
                        <Field type="text" name="workPointOfContact1" id="workPointOfContact1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workPointOfContact1" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="workPointOfContact2" id="workPointOfContact2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workPointOfContact2" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="workEmergencyPlan1">
                          Work Emergency Plan:
                        </label>
                        <Field type="text" name="workEmergencyPlan1" id="workEmergencyPlan1" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workEmergencyPlan1" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="workEmergencyPlan2" id="workEmergencyPlan2" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workEmergencyPlan2" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="workEmergencyPlan3" id="workEmergencyPlan3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workEmergencyPlan3" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <Field type="text" name="workEmergencyPlan4" id="workEmergencyPlan4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="workEmergencyPlan4" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Children</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1Name">
                          Full Name (1)
                        </label>
                        <Field type="text" name="child1Name" id="child1Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1Name" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1Dob">
                          DOB
                        </label>
                        <Field type="date" name="child1Dob" id="child1Dob" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1Dob" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1Sex">
                          Sex
                        </label>
                        <Field type="text" name="child1Sex" id="child1Sex" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1Sex" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1IdentifyingCharacteristics">
                          Identifying Characteristics
                        </label>
                        <Field type="text" name="child1IdentifyingCharacteristics" id="child1IdentifyingCharacteristics" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1IdentifyingCharacteristics" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1School">
                          School/Daycare
                        </label>
                        <Field type="text" name="child1School" id="child1School" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1School" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1SchoolAddress">
                          Address
                        </label>
                        <Field type="text" name="child1SchoolAddress" id="child1SchoolAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1SchoolAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1SchoolPhone">
                          School Phone
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" id="child1SchoolPhone" name="child1SchoolPhone"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1SchoolPhone" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child1CellPhone">
                          Cell Phone
                        </label>
                        <Field type="tel" id="child1CellPhone" name="child1CellPhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child1CellPhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2Name">
                          Full Name (2)
                        </label>
                        <Field type="text" name="child2Name" id="child2Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2Name" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2Dob">
                          DOB
                        </label>
                        <Field type="date" name="child2Dob" id="child2Dob" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2Dob" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2Sex">
                          Sex
                        </label>
                        <Field type="text" name="child2Sex" id="child2Sex" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2Sex" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2IdentifyingCharacteristics">
                          Identifying Characteristics
                        </label>
                        <Field type="text" name="child2IdentifyingCharacteristics" id="child2IdentifyingCharacteristics" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2IdentifyingCharacteristics" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2School">
                          School/Daycare
                        </label>
                        <Field type="text" name="child2School" id="child2School" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2School" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2SchoolAddress">
                          Address
                        </label>
                        <Field type="text" name="child2SchoolAddress" id="child2SchoolAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2SchoolAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2SchoolPhone">
                          School Phone
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" id="child2SchoolPhone" name="child2SchoolPhone"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2SchoolPhone" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child2CellPhone">
                          Cell Phone
                        </label>
                        <Field type="tel" id="child2CellPhone" name="child2CellPhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child2CellPhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3Name">
                          Full Name (3)
                        </label>
                        <Field type="text" name="child3Name" id="child3Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3Name" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3Dob">
                          DOB
                        </label>
                        <Field type="date" name="child3Dob" id="child3Dob" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3Dob" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3Sex">
                          Sex
                        </label>
                        <Field type="text" name="child3Sex" id="child3Sex" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3Sex" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3IdentifyingCharacteristics">
                          Identifying Characteristics
                        </label>
                        <Field type="text" name="child3IdentifyingCharacteristics" id="child3IdentifyingCharacteristics" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3IdentifyingCharacteristics" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3School">
                          School/Daycare
                        </label>
                        <Field type="text" name="child3School" id="child3School" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3School" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3SchoolAddress">
                          Address
                        </label>
                        <Field type="text" name="child3SchoolAddress" id="child3SchoolAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3SchoolAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3SchoolPhone">
                          School Phone
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="tel" id="child3SchoolPhone" name="child3SchoolPhone"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3SchoolPhone" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="child3CellPhone">
                          Cell Phone
                        </label>
                        <Field type="tel" id="child3CellPhone" name="child3CellPhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="child3CellPhone" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Neighborhood Emergency Meeting Place</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlaceName">
                          Name
                        </label>
                        <Field type="text" name="neighborhoodEmergencyMeetingPlaceName" id="neighborhoodEmergencyMeetingPlaceName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlaceName" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlaceAddress">
                          Address
                        </label>
                        <Field type="text" name="neighborhoodEmergencyMeetingPlaceAddress" id="neighborhoodEmergencyMeetingPlaceAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlaceAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlaceState">
                          State
                        </label>
                        <Field type="text" name="neighborhoodEmergencyMeetingPlaceState" id="neighborhoodEmergencyMeetingPlaceState" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlaceState" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlaceZip">
                          ZIP
                        </label>
                        <Field type="text" name="neighborhoodEmergencyMeetingPlaceZip" id="neighborhoodEmergencyMeetingPlaceZip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlaceZip" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlacePhone">
                          Phone
                        </label>
                        <Field type="tel" name="neighborhoodEmergencyMeetingPlacePhone" id="neighborhoodEmergencyMeetingPlacePhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlacePhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhoodEmergencyMeetingPlaceInstructions">
                          Point of Contact/Special Instructions
                        </label>
                        <Field type="text" name="neighborhoodEmergencyMeetingPlaceInstructions" id="neighborhoodEmergencyMeetingPlaceInstructions" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="neighborhoodEmergencyMeetingPlaceInstructions" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Out of Neighborhood Emergency Meeting Place</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlaceName">
                          Name
                        </label>
                        <Field type="text" name="outOfNeighborhoodEmergencyMeetingPlaceName" id="outOfNeighborhoodEmergencyMeetingPlaceName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlaceName" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlaceAddress">
                          Address
                        </label>
                        <Field type="text" name="outOfNeighborhoodEmergencyMeetingPlaceAddress" id="outOfNeighborhoodEmergencyMeetingPlaceAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlaceAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlaceState">
                          State
                        </label>
                        <Field type="text" name="outOfNeighborhoodEmergencyMeetingPlaceState" id="outOfNeighborhoodEmergencyMeetingPlaceState" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlaceState" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlaceZip">
                          ZIP
                        </label>
                        <Field type="text" name="outOfNeighborhoodEmergencyMeetingPlaceZip" id="outOfNeighborhoodEmergencyMeetingPlaceZip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlaceZip" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlacePhone">
                          Phone
                        </label>
                        <Field type="tel" name="outOfNeighborhoodEmergencyMeetingPlacePhone" id="outOfNeighborhoodEmergencyMeetingPlacePhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlacePhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfNeighborhoodEmergencyMeetingPlaceInstructions">
                          Point of Contact/Special Instructions
                        </label>
                        <Field type="text" name="outOfNeighborhoodEmergencyMeetingPlaceInstructions" id="outOfNeighborhoodEmergencyMeetingPlaceInstructions" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfNeighborhoodEmergencyMeetingPlaceInstructions" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Out of Town Emergency Meeting Place</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlaceName">
                          Name
                        </label>
                        <Field type="text" name="outOfTownEmergencyMeetingPlaceName" id="outOfTownEmergencyMeetingPlaceName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlaceName" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlaceAddress">
                          Address
                        </label>
                        <Field type="text" name="outOfTownEmergencyMeetingPlaceAddress" id="outOfTownEmergencyMeetingPlaceAddress" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlaceAddress" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlaceState">
                          State
                        </label>
                        <Field type="text" name="outOfTownEmergencyMeetingPlaceState" id="outOfTownEmergencyMeetingPlaceState" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlaceState" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlaceZip">
                          ZIP
                        </label>
                        <Field type="text" name="outOfTownEmergencyMeetingPlaceZip" id="outOfTownEmergencyMeetingPlaceZip" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlaceZip" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlacePhone">
                          Phone
                        </label>
                        <Field type="tel" name="outOfTownEmergencyMeetingPlacePhone" id="outOfTownEmergencyMeetingPlacePhone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlacePhone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="outOfTownEmergencyMeetingPlaceInstructions">
                          Point of Contact/Special Instructions
                        </label>
                        <Field type="text" name="outOfTownEmergencyMeetingPlaceInstructions" id="outOfTownEmergencyMeetingPlaceInstructions" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="outOfTownEmergencyMeetingPlaceInstructions" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Important Numbers or Information</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers1Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers1Name" name="importantNumbers1Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers1Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers1Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers1Phone" name="importantNumbers1Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers1Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers2Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers2Name" name="importantNumbers2Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers2Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers2Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers2Phone" name="importantNumbers2Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers2Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers3Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers3Name" name="importantNumbers3Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers3Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers3Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers3Phone" name="importantNumbers3Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers3Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers4Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers4Name" name="importantNumbers4Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers4Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers4Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers4Phone" name="importantNumbers4Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers4Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers5Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers5Name" name="importantNumbers5Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers5Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers5Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers5Phone" name="importantNumbers5Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers5Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers6Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers6Name" name="importantNumbers6Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers6Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers6Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers6Phone" name="importantNumbers6Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers6Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers7Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers7Name" name="importantNumbers7Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers7Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers7Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers7Phone" name="importantNumbers7Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers7Phone" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers8Name">
                          Name
                        </label>
                        <Field className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="importantNumbers8Name" name="importantNumbers8Name"/>
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers8Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="importantNumbers8Phone">
                          Phone
                        </label>
                        <Field type="tel" id="importantNumbers8Phone" name="importantNumbers8Phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="importantNumbers8Phone" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className="w-full">
                      <p className="font-bold">Pets</p>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets1Name">
                          Name
                        </label>
                        <Field type="text" name="pets1Name" id="pets1Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets1Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets1Type">
                          Type
                        </label>
                        <Field type="text" name="pets1Type" id="pets1Type" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets1Type" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets1Age">
                          Age
                        </label>
                        <Field type="number" name="pets1Age" id="pets1Age" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets1Age" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets2Name">
                          Name
                        </label>
                        <Field type="text" name="pets2Name" id="pets2Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets2Name" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets2Type">
                          Type
                        </label>
                        <Field type="text" name="pets2Type" id="pets2Type" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets2Type" component="div"/>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pets2Age">
                          Age
                        </label>
                        <Field type="number" name="pets2Age" id="pets2Age" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="pets2Age" component="div"/>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="petsVet">
                          Veterinarian
                        </label>
                        <Field type="text" name="petsVet" id="petsVet" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        <ErrorMessage className="text-red-500 text-xs italic" name="petsVet" component="div"/>
                      </div>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
              
              <button type="submit" disabled={ isSubmitting } className="border-4 rounded-lg border-red-400 bg-white p-1 text-black font-bold" >Print My Emergency Wallet Card</button>

            </Form>
          )}
        </Formik>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
      <p>Copyright © William Hutson</p>
      </footer>
      <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "267188447561463e9916408a83f261b2"}'></script>
    </div>
  )
}
