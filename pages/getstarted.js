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
            // create new pdf doc
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
            // card 1
            doc.addImage(ewc_logo_mono_png, 'PNG', 65, 14, 30, 7)
            doc.setFontSize(6)
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
                        <Field type="text" name="fullName" id="fullName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
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
