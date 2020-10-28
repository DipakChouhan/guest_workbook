package com.owneroftime.guestbook.api.controller;

import com.owneroftime.guestbook.api.model.GuestBookEntryModel;
import com.owneroftime.guestbook.api.service.GuestBookEntryService;
import com.owneroftime.guestbook.common.bean.BaseControllerBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private GuestBookEntryService guestBookEntryService;
    private BaseControllerBean baseControllerBean;

    @GetMapping("/getAllGuestBookEntries")
    public ResponseEntity<BaseControllerBean> getAllGuestBookEntries() {
        baseControllerBean = new BaseControllerBean();
        try {
            List<GuestBookEntryModel> guestBookEntryModels = guestBookEntryService.getAllGuestBookEntries();
            baseControllerBean.setPayloads(guestBookEntryModels);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Records fetched successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getErrorMessages().add("Error occurred while fetching records");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @PostMapping("/deleteGuestBookEntries")
    public ResponseEntity<BaseControllerBean> deleteGuestBookEntries(@RequestBody String guestBookEntryIds) {
        try {
            baseControllerBean = new BaseControllerBean();
            guestBookEntryService.deleteGuestBookEntries(guestBookEntryIds);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Records deleted successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getInfoMessages().add("Error occurred while deleting records");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @PutMapping("/approveGuestBookEntries")
    public ResponseEntity<BaseControllerBean> approveGuestBookEntries(@RequestBody String guestBookEntryIds) {
        baseControllerBean = new BaseControllerBean();
        try {
            guestBookEntryService.approveGuestBookEntries(guestBookEntryIds);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Approved successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getInfoMessages().add("Error occurred while Approving");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }
}
