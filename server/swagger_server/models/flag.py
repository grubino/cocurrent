# coding: utf-8

from __future__ import absolute_import
from .base_model_ import Model
from datetime import date, datetime
from typing import List, Dict
from ..util import deserialize_model


class Flag(Model):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """
    def __init__(self, id: int=None, name: str=None, value: bool=None):
        """
        Flag - a model defined in Swagger

        :param id: The id of this Flag.
        :type id: int
        :param name: The name of this Flag.
        :type name: str
        :param value: The value of this Flag.
        :type value: bool
        """
        self.swagger_types = {
            'id': int,
            'name': str,
            'value': bool
        }

        self.attribute_map = {
            'id': 'id',
            'name': 'name',
            'value': 'value'
        }

        self._id = id
        self._name = name
        self._value = value

    @classmethod
    def from_dict(cls, dikt) -> 'Flag':
        """
        Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Flag of this Flag.
        :rtype: Flag
        """
        return deserialize_model(dikt, cls)

    @property
    def id(self) -> int:
        """
        Gets the id of this Flag.

        :return: The id of this Flag.
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id: int):
        """
        Sets the id of this Flag.

        :param id: The id of this Flag.
        :type id: int
        """

        self._id = id

    @property
    def name(self) -> str:
        """
        Gets the name of this Flag.

        :return: The name of this Flag.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name: str):
        """
        Sets the name of this Flag.

        :param name: The name of this Flag.
        :type name: str
        """

        self._name = name

    @property
    def value(self) -> bool:
        """
        Gets the value of this Flag.

        :return: The value of this Flag.
        :rtype: bool
        """
        return self._value

    @value.setter
    def value(self, value: bool):
        """
        Sets the value of this Flag.

        :param value: The value of this Flag.
        :type value: bool
        """

        self._value = value

