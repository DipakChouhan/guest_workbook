package com.owneroftime.guestbook.api.service;

import com.owneroftime.guestbook.api.model.GuestBookEntryModel;

import java.util.List;

public interface GuestBookEntryService {

    void createGuestBookEntry(GuestBookEntryModel guestBookEntryModel);

    List<GuestBookEntryModel> getAllGuestBookEntries();

    void deleteGuestBookEntries(String guestBookEntryIds);

    void approveGuestBookEntries(String guestBookEntryIds);

    List<GuestBookEntryModel> getAllGuestBookEntriesForUser(Long userId);

    void updateGuestEntryText(GuestBookEntryModel guestBookEntryModel);
}
