
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { InsuranceType } from '@/types';
import { INSURANCE_TYPES } from '@/utils/constants';
import { CreditCard, Calendar, Lock, Shield, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CheckoutFormProps {
  insuranceType: InsuranceType;
  onComplete: () => void;
  onBack: () => void;
}

const CheckoutForm = ({ insuranceType, onComplete, onBack }: CheckoutFormProps) => {
  const insurance = INSURANCE_TYPES.find(i => i.id === insuranceType);
  const isEFTOnlyInsurance = insuranceType === 'event-liability' || insuranceType === 'contractors-all-risk';
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'eft'>(isEFTOnlyInsurance ? 'eft' : 'debit');
  const [billCycle, setBillCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showMandateDialog, setShowMandateDialog] = useState(false);
  
  // Form validation state
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountType: '',
    accountNumber: '',
    branchCode: '',
    debitDay: '',
    mandateAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Mock quote details
  const quoteDetails = {
    monthlyPremium: 'R 450',
    annualPremium: 'R 4,860',
    savingsWithAnnual: 'R 540',
    coverageStart: new Date().toLocaleDateString('en-ZA', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'debit') {
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required';
      }
      if (!formData.bankName) {
        newErrors.bankName = 'Bank name is required';
      }
      if (!formData.accountType) {
        newErrors.accountType = 'Account type is required';
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required';
      }
      if (!formData.branchCode.trim()) {
        newErrors.branchCode = 'Branch code is required';
      }
      if (!formData.debitDay) {
        newErrors.debitDay = 'Debit day is required';
      }
      if (!formData.mandateAccepted) {
        newErrors.mandateAccepted = 'You must accept the debit order mandate';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete();
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
        {!isEFTOnlyInsurance && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-medium mb-4">Billing Cycle</h3>
            
            <RadioGroup 
              defaultValue={billCycle} 
              onValueChange={(value) => setBillCycle(value as 'monthly' | 'annual')}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                  <div className="font-medium">Monthly</div>
                  <div className="text-sm text-muted-foreground">
                    {quoteDetails.monthlyPremium} per month
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-4 border-primary/50 bg-primary/5">
                <RadioGroupItem value="annual" id="annual" />
                <Label htmlFor="annual" className="flex-1 cursor-pointer">
                  <div className="font-medium">Annual (Save {quoteDetails.savingsWithAnnual})</div>
                  <div className="text-sm text-muted-foreground">
                    {quoteDetails.annualPremium} per year
                  </div>
                </Label>
                <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  BEST VALUE
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
        
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-medium mb-4">Payment Method</h3>
          
          <RadioGroup 
            defaultValue={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'debit' | 'eft')}
            className="space-y-4 mb-6"
          >
            {!isEFTOnlyInsurance && (
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="flex-1 cursor-pointer">
                  <div className="font-medium">Monthly debit order</div>
                </Label>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="eft" id="eft" />
              <Label htmlFor="eft" className="flex-1 cursor-pointer">
                <div className="font-medium">EFT Payment</div>
              </Label>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
          </RadioGroup>
          
          {paymentMethod === 'debit' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input 
                  id="accountHolderName" 
                  placeholder="Account Holder Name"
                  value={formData.accountHolderName}
                  onChange={(e) => updateFormData('accountHolderName', e.target.value)}
                  className={errors.accountHolderName ? 'border-destructive' : ''}
                />
                {errors.accountHolderName && (
                  <p className="text-sm text-destructive">{errors.accountHolderName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select 
                  value={formData.bankName} 
                  onValueChange={(value) => updateFormData('bankName', value)}
                >
                  <SelectTrigger className={errors.bankName ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="absa">ABSA Bank</SelectItem>
                    <SelectItem value="fnb">First National Bank</SelectItem>
                    <SelectItem value="standard">Standard Bank</SelectItem>
                    <SelectItem value="nedbank">Nedbank</SelectItem>
                    <SelectItem value="capitec">Capitec Bank</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bankName && (
                  <p className="text-sm text-destructive">{errors.bankName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Bank Account Type</Label>
                <Select 
                  value={formData.accountType} 
                  onValueChange={(value) => updateFormData('accountType', value)}
                >
                  <SelectTrigger className={errors.accountType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="cheque">Cheque Account</SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountType && (
                  <p className="text-sm text-destructive">{errors.accountType}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Bank Account Number</Label>
                <Input 
                  id="accountNumber" 
                  placeholder="652565265201"
                  value={formData.accountNumber}
                  onChange={(e) => updateFormData('accountNumber', e.target.value)}
                  className={errors.accountNumber ? 'border-destructive' : ''}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branchCode">Bank Branch Code</Label>
                <Input 
                  id="branchCode" 
                  placeholder="Enter your Bank Branch Code"
                  value={formData.branchCode}
                  onChange={(e) => updateFormData('branchCode', e.target.value)}
                  className={errors.branchCode ? 'border-destructive' : ''}
                />
                {errors.branchCode && (
                  <p className="text-sm text-destructive">{errors.branchCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="debitDay">On what day do you want your debit order to run</Label>
                <Select 
                  value={formData.debitDay} 
                  onValueChange={(value) => updateFormData('debitDay', value)}
                >
                  <SelectTrigger className={errors.debitDay ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of the month</SelectItem>
                    <SelectItem value="15">15th of the month</SelectItem>
                    <SelectItem value="25">25th of the month</SelectItem>
                    <SelectItem value="30">30th of the month</SelectItem>
                  </SelectContent>
                </Select>
                {errors.debitDay && (
                  <p className="text-sm text-destructive">{errors.debitDay}</p>
                )}
              </div>
              
              <div className="flex items-top space-x-2 pt-2">
                <Checkbox 
                  id="debitMandate"
                  checked={formData.mandateAccepted}
                  onCheckedChange={(checked) => updateFormData('mandateAccepted', !!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="debitMandate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I have read and accept the Debit Order Mandate
                    </label>
                    <Button 
                      type="button"
                      size="sm"
                      className="h-6 px-3 text-xs bg-cyan-500 hover:bg-cyan-600 text-white"
                      onClick={() => setShowMandateDialog(true)}
                    >
                      Read
                    </Button>
                  </div>
                  {errors.mandateAccepted && (
                    <p className="text-sm text-destructive">{errors.mandateAccepted}</p>
                  )}
                </div>
              </div>
            </form>
          )}
          
          {paymentMethod === 'eft' && (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Bank Details</h4>
                <div className="space-y-2 text-sm">
                  <p>Account Name: Bi-me</p>
                  <p>Bank: First National Bank</p>
                  <p>Account Number: 123456789</p>
                  <p>Branch Code: 250655</p>
                  <p>Reference: [Your Business Name]</p>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Please use your business name as the payment reference. Your policy will be activated once payment is confirmed.
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.div className="space-y-6" variants={itemVariants}>
        <div className="bg-card rounded-xl border border-border p-6 sticky top-6">
          <h3 className="font-medium mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coverage</span>
              <span>{insurance?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Premium</span>
              <span>
                {isEFTOnlyInsurance 
                  ? `${quoteDetails.annualPremium} (once-off)`
                  : billCycle === 'monthly' 
                    ? `${quoteDetails.monthlyPremium}/month`
                    : `${quoteDetails.annualPremium}/year`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coverage Start</span>
              <span>{quoteDetails.coverageStart}</span>
            </div>
            <div className="border-t border-border my-3"></div>
            <div className="flex justify-between font-semibold">
              <span>Total Due Today</span>
              <span>
                {isEFTOnlyInsurance 
                  ? quoteDetails.annualPremium
                  : billCycle === 'monthly' 
                    ? quoteDetails.monthlyPremium 
                    : quoteDetails.annualPremium
                }
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-6 bg-primary/5 p-3 rounded-lg">
            <Shield className="h-4 w-4 text-primary" />
            <div className="text-muted-foreground">Your information is secure and encrypted</div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Button onClick={handleSubmit} size="lg">
              Complete Purchase
            </Button>
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Dialog open={showMandateDialog} onOpenChange={setShowMandateDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-blue-600">
              Debit Order Mandate
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMandateDialog(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">A. Authority</h3>
              <p className="leading-relaxed">
                This signed Authority and Mandate relates to our contract dated today ("the Agreement") I/We hereby 
                authorise you to issue and deliver payment instructions to your Banker for collection against my/our 
                above-mentioned account at my/our above-mentioned Bank (or any other above-mentioned Bank for any 
                other Bank account which I/we may hereinafter nominate to you in writing as my/our account) on condition that the sum of such 
                payment instructions will never exceed my/our obligations as agreed to in the Agreement as selected in 
                this document and initial Authority and Mandate. This Authority and Mandate is terminated by 
                me/us by giving you notice in writing of not less than 20 (twenty) ordinary working days, and sent by email.
              </p>
              <p className="leading-relaxed mt-2">
                The periodic collection instructions be issued and delivered as follows: monthly, on the 
                payment date falls on a Sunday, or recognised South African public holiday, the payment 
                day will automatically be the very next ordinary business day.
              </p>
              <p className="leading-relaxed mt-2">
                I/We understand that the withdrawals hereby authorised will be processed through a computerised 
                system provided by the South African Banks. I also understand the details of each withdrawal will be 
                printed on my Bank statement. Such must contain a number, which must be included in the said 
                payment instruction and if provided to me should enable me to identify the Agreement.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">B. Mandate</h3>
              <p className="leading-relaxed">
                I/We acknowledge that all payment instructions issued by you shall be treated by my/our above-
                mentioned Bank as if the instructions have been issued by me/us personally.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">C. Cancellation</h3>
              <p className="leading-relaxed">
                I/We agree that although this Authority and Mandate may be cancelled by me/us, such cancellation will 
                not cancel the Agreement I/We may not be entitled to any refund of amounts which you have withdrawn 
                while this authority was in force, if such amounts were legally owing to you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">D. Assignment</h3>
              <p className="leading-relaxed">
                I/We acknowledge that this Authority may be ceded or assigned to a third party if the Agreement is also 
                ceded or assigned to that third party, but in the absence of such assignment of the Agreement this 
                Authority and Mandate cannot be assigned to any third party.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => setShowMandateDialog(false)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CheckoutForm;
