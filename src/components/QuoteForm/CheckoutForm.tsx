
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { InsuranceType } from '@/types';
import { INSURANCE_TYPES } from '@/utils/constants';
import { CreditCard, Calendar, Lock, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CheckoutFormProps {
  insuranceType: InsuranceType;
  onComplete: () => void;
  onBack: () => void;
}

const CheckoutForm = ({ insuranceType, onComplete, onBack }: CheckoutFormProps) => {
  const insurance = INSURANCE_TYPES.find(i => i.id === insuranceType);
  const [paymentMethod, setPaymentMethod] = useState<'debit' | 'eft'>('debit');
  const [billCycle, setBillCycle] = useState<'monthly' | 'annual'>('monthly');
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
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
        
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-medium mb-4">Payment Method</h3>
          
          <RadioGroup 
            defaultValue={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'debit' | 'eft')}
            className="space-y-4 mb-6"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-4">
              <RadioGroupItem value="debit" id="debit" />
              <Label htmlFor="debit" className="flex-1 cursor-pointer">
                <div className="font-medium">Monthly debit order</div>
              </Label>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            
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
                <Input id="accountHolderName" placeholder="Account Holder Name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select>
                  <SelectTrigger>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Bank Account Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="cheque">Cheque Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Bank Account Number</Label>
                <Input id="accountNumber" placeholder="652565265201" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branchCode">Bank Branch Code</Label>
                <Input id="branchCode" placeholder="Enter your Bank Branch Code" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debitDay">On what day do you want your debit order to run</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of the month</SelectItem>
                    <SelectItem value="15">15th of the month</SelectItem>
                    <SelectItem value="25">25th of the month</SelectItem>
                    <SelectItem value="30">30th of the month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-top space-x-2 pt-2">
                <Checkbox id="debitMandate" />
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
                    >
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {paymentMethod === 'eft' && (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Bank Details</h4>
                <div className="space-y-2 text-sm">
                  <p>Account Name: Micro Shield Insurance</p>
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
              <span>{billCycle === 'monthly' ? quoteDetails.monthlyPremium + '/month' : quoteDetails.annualPremium + '/year'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coverage Start</span>
              <span>{quoteDetails.coverageStart}</span>
            </div>
            <div className="border-t border-border my-3"></div>
            <div className="flex justify-between font-semibold">
              <span>Total Due Today</span>
              <span>{billCycle === 'monthly' ? quoteDetails.monthlyPremium : quoteDetails.annualPremium}</span>
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
    </motion.div>
  );
};

export default CheckoutForm;
