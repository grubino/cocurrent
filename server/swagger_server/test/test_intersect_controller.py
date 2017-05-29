# coding: utf-8

from __future__ import absolute_import

from swagger_server.models.flag_set_dto import FlagSetDTO
from . import BaseTestCase
from six import BytesIO
from flask import json


class TestIntersectController(BaseTestCase):
    """ IntersectController integration test stubs """

    def test_intersect_get(self):
        """
        Test case for intersect_get

        
        """
        response = self.client.open('/cocurrent/intersect',
                                    method='GET',
                                    content_type='application/json')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))

    def test_intersect_post(self):
        """
        Test case for intersect_post

        
        """
        data = dict(rows=(BytesIO(b'some file data'), 'file.txt'))
        response = self.client.open('/cocurrent/intersect',
                                    method='POST',
                                    data=data,
                                    content_type='multipart/form-data')
        self.assert200(response, "Response body is : " + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
