package com.owneroftime.guestbook.api.controller;

import com.owneroftime.guestbook.api.model.GuestBookEntryModel;
import com.owneroftime.guestbook.api.service.GuestBookEntryService;
import com.owneroftime.guestbook.common.bean.BaseControllerBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/guest")
public class GuestController {

    @Autowired
    private GuestBookEntryService guestBookEntryService;
    private BaseControllerBean baseControllerBean;

    @PostMapping("/createGuestBookEntry")
    public ResponseEntity<BaseControllerBean> createGuestBookEntry(@RequestBody GuestBookEntryModel guestBookEntryModel) {
        baseControllerBean = new BaseControllerBean();
        try {
            if (null == guestBookEntryModel) {
                baseControllerBean.getErrorMessages().add("Please check request body, it should meet API specifications");
                return new ResponseEntity<>(baseControllerBean, HttpStatus.NOT_ACCEPTABLE);
            }
            guestBookEntryService.createGuestBookEntry(guestBookEntryModel);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Saved successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getInfoMessages().add("Save operation failed");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @PostMapping("/createGuestBookEntryImage")
    public ResponseEntity<BaseControllerBean> createGuestBookEntryImage(@RequestParam("file") MultipartFile multipartFile) {
        baseControllerBean = new BaseControllerBean();
        try {
            if (null == multipartFile) {
                baseControllerBean.getErrorMessages().add("Please check request, it should meet API specifications");
                return new ResponseEntity<>(baseControllerBean, HttpStatus.NOT_ACCEPTABLE);
            }
            GuestBookEntryModel guestBookEntryModel = new GuestBookEntryModel();
            guestBookEntryModel.setGuestBookEntryImage(multipartFile.getBytes());
            guestBookEntryService.createGuestBookEntry(guestBookEntryModel);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Image Uploaded successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getInfoMessages().add("Image Uploaded operation failed");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @GetMapping("/getAllGuestBookEntriesForUser/{userId}")
    public ResponseEntity<BaseControllerBean> getAllGuestBookEntriesForUser(@PathVariable("userId") Long userId) {
        baseControllerBean = new BaseControllerBean();
        try {
            List<GuestBookEntryModel> guestBookEntryModels = guestBookEntryService.getAllGuestBookEntriesForUser(userId);
            baseControllerBean.setPayloads(guestBookEntryModels);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Records fetched successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getErrorMessages().add("Error occurred while fetching records");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }
    @PostMapping("/updateGuestEntryText")
    public ResponseEntity<BaseControllerBean> updateGuestEntryText(@RequestBody GuestBookEntryModel guestBookEntryModel) {
        baseControllerBean = new BaseControllerBean();
        try {
            guestBookEntryService.updateGuestEntryText(guestBookEntryModel);
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("Records update successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(false);
            baseControllerBean.getErrorMessages().add("Update failed");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

}
