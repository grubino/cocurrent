# coding: utf-8

from __future__ import absolute_import

from swagger_server.models.inline_response200 import InlineResponse200
from . import BaseTestCase
from six import BytesIO
from flask import json


class TestProgressController(BaseTestCase):
    """ ProgressController integration test stubs """

    def test_progress_get(self):
        """
        Test case for progress_get

        
        """
        response = self.client.open('/cocurrent/progress',
                                    method='GET',
                                    content_type='application/json')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
