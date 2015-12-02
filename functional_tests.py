from selenium import webdriver
import unittest

class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3) # Wait three seconds before trying anything.

    def tearDown(self):
        self.browser.quit()

    def test_can_display_a_map(self):
    # Thunder is a TriMet rider who wants to know the actual location of his bus. 

    # He logs on to the homepage.
        self.browser.get('http://localhost:8080')

    # He makes sure that he's on the correct page.
        self.assertIn('TriMet Vehicle Tracker', self.browser.title)
    #self.fail('Finish the test!')

    # He sees a map of Portland. REPLACE WITH ACTUAL JS GOOGLE MAP LATER.
        temp_map = self.browser.find_element_by_id('tempMap')
        self.assertEqual(
            temp_map.get_attribute('src'),
            'http://localhost:8080/static/map/test.png'
            )    

    # He is greeted with an input field asking about his particular route.
        inputbox = self.browser.find_element_by_id('inputBox')
        self.assertEqual(
            inputbox.get_attribute('placeholder'),
            'Enter a Transit Route to Map'
            )

    # He types "35" for ROUTE 35 and hits the "Map It!" button
        submit_button = self.browser.find_element_by_id('submitButton')
        self.assertEqual(
            submit_button.get_attribute('value'),
            'Map it!'
            )

    # Upon selecting "ROUTE 35", the page displays markers of all vehicles currently

    # servicing this route, along with an outline of the route. 

    # If he hovers his mouse over the vehicle markers, information such as the BUS
    # NUMBER, SIGN INFORMATION, and DELAY is reported.

    # Thunder checks a box labled "View Stops" to see all the stops along the route.

    # Satisfied with all the information he's received, Thunder closes the app.

if __name__ == "__main__":
    unittest.main(warnings='ignore')