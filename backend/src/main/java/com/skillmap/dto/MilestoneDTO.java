package com.skillmap.dto;

import lombok.Data;

@Data
public class MilestoneDTO {
    private String title;
    private String description;
    private String resourceUrl;
    private Integer orderIndex;
}
