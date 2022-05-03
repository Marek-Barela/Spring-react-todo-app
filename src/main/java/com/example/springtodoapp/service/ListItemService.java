package com.example.springtodoapp.service;

import com.example.springtodoapp.dao.ListItemDao;
import com.example.springtodoapp.model.ListItem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ListItemService {
	private final ListItemDao	listItemDao;

	@Autowired
	public ListItemService(@Qualifier("postgres") ListItemDao listItemDao) {
		this.listItemDao = listItemDao;
	}

	public int addListItem(ListItem listItem) {
		return listItemDao.insertListItem(listItem);
	}

	public List<ListItem> getAllListItems() {
		return listItemDao.selectAllListItems();
	}

	public Optional<ListItem> getListItemById(UUID id) {
		return listItemDao.selectListItemById(id);
	}

	public int deleteListItemById(UUID id) {
		return listItemDao.deleteListItemById(id);
	}

	public int updateListItemById(UUID id, ListItem newListItem) {
		return listItemDao.updateListItemById(id, newListItem);
	}
}
