import {Vacancies} from '../../api/vacancies/vacancies';

if (Vacancies.find().count() == 0) {
    Vacancies.insert({
        "title" : "PEX Manager / Engineer 卓越绩效经理/工程师",
        "location": "Hefei",
        "fieldOfExpertise" : "engineering",
        "experience" : "1-4",
        "mobileAtsId" : "82818189",
        "purpose" : "<p>工作地点\t&nbsp;&nbsp; 合肥<br>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;能\t&nbsp;&nbsp; 0560<br>学历要求\t&nbsp;&nbsp; 本科</p>",
        "responsibility" : "<ul><li>Facilitate and organize DMAIC activity</li><li>Facilitate and champion Kaizen and shop floor activities</li><li>Coordinate cost leadership program in plant</li><li>Deploy and align with division Performance Excellent related programs</li><li>Provide training or coordinate resource for plant Performance Excellent related training</li><li>Periodical performance report for management team</li><li>Deploy/promote lean manufacturing program in plant</li></ul>",
        "educationAndExperience" : "<ul><li>B.S or above degree in IE relative major</li><li>Lean manufacturing experience is preferred</li></ul>",
        "requiredSkills" : "<ul><li>Good knowledge in DMIAC, Statistic Tools, SPC, QC Story and relative tools.</li><li>Logical thinking and data oriented.</li><li>Problem solving and decision-making skill.</li><li>Good English comprehension in listening, speaking, writing and reading.</li><li>MS – Office, familiar with Excel</li></ul>",
        "desiredSkills" : "<ul><li>Shop floor improvement activity such as TPM, QCC, 6 sigma training</li><li>DMAIC GB/BB is a plus<br></li></ul>",
        "softSkills" : "<ul><li>Planning ability to annual plan and activities with strong Logic thinking</li><li>Aptitude for success in a dynamic, rapidly changing environment</li><li>Ability to engage employees to involve within PEx activities.</li></ul>"
    });
}
