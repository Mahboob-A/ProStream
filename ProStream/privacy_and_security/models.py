from django.db import models
import uuid 
import random
import string 
from django.utils import timezone


from streamer_profile.models import * 
from django.conf import settings


# 181023, Wednesday, 10.15 pm 

# 191023, Thursday, 10.00 am 

class ReportCategory(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        name = models.CharField(max_length=30, help_text='Name of the main report category')
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True) 
        
        def __str__(self): 
                return self.name 
        
        
class Report_SubCategory(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        report_categoty = models.ForeignKey(ReportCategory, on_delete=models.CASCADE, related_name='sub_category_names')
        name = models.CharField(max_length=50, help_text='Sub category name of the report')
        text = models.TextField(null=True, blank=True, help_text='Additional information about the report')
        supporting_image = models.ImageField(upload_to='Report/SubCategory/SupportingDocuments/', null=True, blank=True)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True)
        
        def __str__(self): 
                return self.name 
        
        
class ReportTicket(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        category = models.ForeignKey(ReportCategory, on_delete=models.CASCADE, related_name='category_reports')
        sub_categoty = models.ForeignKey(Report_SubCategory, on_delete=models.CASCADE, related_name='sub_category_reports')
        user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_reported_tickets')
        streamer = models.ForeignKey(Streamer, on_delete=models.SET_NULL, related_name='tickets_raised_against')
        
        ticket_no = models.CharField(max_length=15, help_text='Report ticket unique number', null=True, blank=True)
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True)
        
        def __str__(self): 
                return f"Report ticket for streamer - {self.streamer.first_name} {self.streamer.last_name}"
        
        def save(self, *args, **kwargs): 
                # creating 12 chars uniwue ticket id 
                letters = ''.join(random.choices(string.ascii_letters, k=3)).upper()
                digits =  ''.join(random.choices(string.digits, k=2))
                uid = str(uuid.uuid4())
                first = uid[:3] # 3 chars 
                middle = uid[10:12]  # 2 chars 
                last = uid[30:32] # 2 chars 
                generated_ticket_no = f"TKT{last}{letters}{first}{digits}{middle}"
                self.ticket_no = generated_ticket_no
                while ReportTicket.objects.filter(ticket_no=self.ticket_no).exists(): # if same ticket, by any change, exists, then recreate the 3 letters 
                        letters = ''.join(random.choices(string.ascii_letters, k=3)).upper()
                        generated_ticket_no = f"TKT{last}{letters}{first}{digits}{middle}"
                        self.ticket_no = generated_ticket_no 
                super().save(*args, **kwargs)
                
        
        
REPORT_INVESTIGATION_CHOICES = (
        ('No Action Needed', 'No Action Needed'),
        ('False Report', 'False Report'),
        ('Need More Investigation', 'Need More Investigation'),
        ('Report Partially Valid', 'Report Partially Valid'),
        ('Report Fully Valid', 'Report Fully Valid'),
        ('Content Against Rules', 'Content Against Rules'), 
        ('Streamer Found Guilty', 'Streamer Found Guilty'),
        ('Content Should Be Removed', 'Content Should Be Removed'),
        ('Need Higher Escalation', 'Need Higher Escalation'),
        ('Other', 'Other')
        
)

REPORT_ACTION_CHOICES = (
        ('No Action Needed', 'No Action Needed'),
        ('False Report', 'False Report'),
        ('Need More Investigation', 'Need More Investigation'),
        ('Content Restrict Temporarily', 'Content Restrict Temporarily'),
        ('Content Restrict Fully', 'Content Restrict Fully'),
        ('Streamer Is Warned', 'Streamer Is Warned'), 
        ('Streamer Temporarily Deactivated', 'Streamer Temporarily Deactivated'),
        ('Escalated To Higher Authority', 'Escalated To Higher Authority'),
        ('Streamer Permanently Banned', 'Streamer Permanently Banned'),
        ('Other', 'Other'),
)

class TicketResolution(models.Model): 
        id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
        ticket = models.ForeignKey(ReportTicket, on_delete=models.CASCADE, related_name='ticket_resolutions')
        user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_ticket_resolutions')
        streamer = models.ForeignKey(Streamer, on_delete=models.SET_NULL, related_name='streamer_ticket_resolutions')
        
        comment = models.TextField(null=True, blank=True,  help_text='The decision taken on the ticket')
        report_investiongation = models.CharField(max_length=15, choices=REPORT_INVESTIGATION_CHOICES, help_text='The investation')
        report_action = models.CharField(max_length=15, choices=REPORT_ACTION_CHOICES, help_text='The action taken for the report')
        
        createdAt = models.DateTimeField(default=timezone.now)
        updatedAt = models.DateTimeField(auto_now=True)
        
        def __str__(self): 
                return f"Resolution for streamer {self.streamer.first_name} {self.streamer.last_name}'s ticket no - {self.ticket.ticket_no}"
        
        
        